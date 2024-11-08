import path from "path";
import * as fs from "fs";
import { createSlug, createText, SpeakerData, TopicsData, unsluggify } from "./src/utils";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import { Transcript as ContentTranscriptType, Source as ContentSourceType } from "./.contentlayer/generated/types";

const Resources = defineNestedType(() => ({
  name: "Resources",
  fields: {
    title: { type: "string" },
    url: { type: "string" },
  },
}));
export interface CategoryInfo {
  title: string;
  slug: string;
  optech_url: string;
  categories: string[];
  aliases?: string[];
  excerpt: string;
}

interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

interface ContentTree {
  [key: string]: ContentTree | ContentTranscriptType[];
}

/**
 * Count the occurrences of all tags across transcripts and write to json file
 */
function createTagCount(allTranscripts: ContentTranscriptType[]): {
  tagCounts: Record<string, number>;
} {
  const tagCounts: Record<string, number> = {};

  for (const file of allTranscripts) {
    if (!file.tags) continue;

    for (const tag of file.tags) {
      const formattedTag = createSlug(tag);
      tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1;
    }
  }

  return { tagCounts };
}

const getTranscriptAliases = (allTranscripts: ContentTranscriptType[]) => {
  const aliases: Record<string, string> = {};

  for (const transcript of allTranscripts) {
    if (!transcript.aliases) continue;

    if (transcript.aliases) {
      transcript.aliases.forEach((alias) => {
        aliases[alias] = transcript.url;
      });
    }
  }

  fs.writeFileSync("./public/aliases.json", JSON.stringify(aliases));
};

const getCategories = () => {
  const filePath = path.join(process.cwd(), "public", "categories.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

function organizeTags(transcripts: ContentTranscriptType[]) {
  const categories: CategoryInfo[] = getCategories();
  const { tagCounts } = createTagCount(transcripts);

  const tagsByCategory: { [category: string]: TagInfo[] } = {};
  const tagsWithoutCategory = new Set<string>();
  const categorizedTags = new Set<string>();

  // Create a map for faster category lookup
  const categoryMap = new Map<string, CategoryInfo>();

  categories.forEach((cat) => {
    cat.categories.forEach((category) => {
      if (!tagsByCategory[category]) {
        tagsByCategory[category] = [];
      }
    });
    categoryMap.set(createSlug(cat.slug), cat);
    cat.aliases?.forEach((alias) => categoryMap.set(alias, cat));
  });

  // Process all tags at once
  const allTags = new Set(transcripts.flatMap((transcript) => transcript.tags?.map((tag) => tag) || []));

  allTags.forEach((tag) => {
    const catInfo = categoryMap.get(tag);
    if (catInfo) {
      catInfo.categories.forEach((category) => {
        if (!tagsByCategory[category].some((t) => t.slug === tag)) {
          tagsByCategory[category].push({
            name: catInfo.title,
            slug: tag,
            count: tagCounts[tag] || 0,
          });
        }
      });
      categorizedTags.add(tag);
    } else {
      tagsWithoutCategory.add(tag);
    }
  });

  // Add "Miscellaneous" category with remaining uncategorized tags
  if (tagsWithoutCategory.size > 0) {
    tagsByCategory["Miscellaneous"] = Array.from(tagsWithoutCategory).map((tag) => ({
      name: tag,
      slug: tag,
      count: tagCounts[tag] || 0,
    }));
  }

  // Sort tags alphabetically within each category
  Object.keys(tagsByCategory).forEach((category) => {
    tagsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  fs.writeFileSync("./public/tag-data.json", JSON.stringify(tagsByCategory));
  return { tagsByCategory, tagsWithoutCategory };
}

function organizeTopics(transcripts: ContentTranscriptType[]) {
  const slugTopics: any = {};
  const topicsArray: TopicsData[] = [];

  transcripts.forEach((transcript) => {
    const slugTags = transcript.tags?.map((tag) => ({
      slug: createSlug(tag),
      name: tag,
    }));

    slugTags?.forEach(({ slug, name }) => {
      if (slugTopics[slug] !== undefined) {
        const index = slugTopics[slug];
        topicsArray[index].count += 1;
      } else {
        const topicsLength = topicsArray.length;
        slugTopics[slug] = topicsLength;
        topicsArray[topicsLength] = {
          slug,
          name,
          count: 1,
        };
      }
    });
  });

  fs.writeFileSync("./public/topics-data.json", JSON.stringify(topicsArray));
}

function createSpeakers(transcripts: ContentTranscriptType[]) {
  const slugSpeakers: any = {};
  const speakerArray: SpeakerData[] = [];

  transcripts.forEach((transcript) => {
    const slugSpeakersArray = transcript.speakers?.map((speaker) => ({
      slug: createSlug(speaker),
      name: speaker,
    }));

    slugSpeakersArray?.forEach(({ slug, name }) => {
      if (slugSpeakers[slug] !== undefined) {
        const index = slugSpeakers[slug];
        speakerArray[index].count += 1;
      } else {
        const speakersLength = speakerArray.length;
        slugSpeakers[slug] = speakersLength;
        speakerArray[speakersLength] = {
          slug,
          name,
          count: 1,
        };
      }
    });
  });

  fs.writeFileSync("./public/speaker-data.json", JSON.stringify(speakerArray));
}

function generateSourcesCount(transcripts: ContentTranscriptType[], sources: ContentSourceType[]) {
  const sourcesArray: TagInfo[] = [];
  const slugSources: Record<string, number> = {};

  transcripts.forEach((transcript) => {
    const slug = transcript._raw.flattenedPath.split("/")[0];

    if (slugSources[slug] !== undefined) {
      sourcesArray[slugSources[slug]].count += 1;
    } else {
      const sourcesLength = sourcesArray.length;
      slugSources[slug] = sourcesLength;

      const getSourceName = (slug: string) =>
        sources.find((source) => source.language === "en" && source.slugAsParams[0] === slug)?.title ?? unsluggify(slug);

      sourcesArray[sourcesLength] = {
        slug,
        name: getSourceName(slug),
        count: 1,
      };
    }
  });

  fs.writeFileSync("./public/source-count-data.json", JSON.stringify(sourcesArray));
  return { sourcesArray, slugSources };
}

const createTypesCount = (transcripts: ContentTranscriptType[], sources: ContentSourceType[]) => {
  const { sourcesArray, slugSources } = generateSourcesCount(transcripts, sources);
  const nestedTypes: any = {};

  sources.forEach((transcript) => {
    if (transcript.types) {
      transcript.types.forEach((type) => {
        const slugType = type.charAt(0).toUpperCase() + type.slice(1);
        const slug = transcript.slugAsParams[0];

        const sourceIndex = slugSources[slug];
        const getSource = sourcesArray[sourceIndex] ?? null;

        if (!nestedTypes[slugType]) {
          nestedTypes[slugType] = [];
        } else {
          if (nestedTypes[slugType].includes(getSource) || getSource === null) return;
          nestedTypes[slugType].push(getSource);
        }
      });
    }
  });

  fs.writeFileSync("./public/types-data.json", JSON.stringify(nestedTypes));
};

function organizeContent(transcripts: ContentTranscriptType[]) {
  const tree: ContentTree = {};

  transcripts.forEach((transcript) => {
    const parts = transcript.slugAsParams;
    let current = tree;

    const isNonEnglishDir = /\w+\.[a-z]{2}\b/.test(parts[parts.length - 1]);
    if (isNonEnglishDir) return;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = i === parts.length - 2 ? [] : {};
      }
      current = current[parts[i]] as ContentTree;
    }

    (current as unknown as any[]).push({
      title: transcript.title,
      speakers: transcript.speakers,
      date: transcript.date,
      tags: transcript.tags,
      sourceFilePath: transcript._raw.sourceFilePath,
      flattenedPath: transcript._raw.flattenedPath,
      summary: transcript.summary,
      body: createText(transcript.body),
      source: transcript.source,
    });
  });

  // Save the result as JSON
  fs.writeFileSync("./public/sources-data.json", JSON.stringify(tree, null, 2));
}

export const Transcript = defineDocumentType(() => ({
  name: "Transcript",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    speakers: { type: "list", of: { type: "string" } },
    date: { type: "date" },
    transcript_by: { type: "string" },
    Transcript_by: { type: "string" },
    categories: { type: "list", of: { type: "string" } },
    tag: { type: "list", of: { type: "string" } },
    tags: { type: "list", of: { type: "string" } },
    media: { type: "string" },
    translation_by: { type: "string" },
    episode: { type: "number" },
    aliases: { type: "list", of: { type: "string" } },
    video: { type: "string" },
    hosts: { type: "list", of: { type: "string" } },
    source: { type: "string" },
    transcription_coverage: { type: "string" },
    summary: { type: "string" },
    needs: { type: "string" },
    aditional_resources: { type: "list", of: Resources },
    additional_resources: { type: "list", of: Resources },
    weight: { type: "number" },
    types: { type: "list", of: { type: "string" } },
    source_file: { type: "string" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "list",
      resolve: (doc) => doc._raw.flattenedPath.split("/"),
    },
  },
}));

export const Source = defineDocumentType(() => ({
  name: "Source",
  filePathPattern: `**/_index{,.??}.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    source: { type: "string" },
    transcription_coverage: { type: "string" },
    hosts: { type: "list", of: { type: "string" } },
    weight: { type: "number" },
    website: { type: "string" },
    types: { type: "list", of: { type: "string" } },
    additional_resources: { type: "list", of: Resources },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath.split("/").slice(0, -1).join("/")}`,
    },
    language: {
      type: "string",
      resolve: (doc) => {
        const index = doc._raw.flattenedPath.split("/").pop();
        const lan = index?.split(".").length === 2 ? index?.split(".")[1] : "en";
        return lan;
      },
    },
    slugAsParams: {
      type: "list",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(0, -1),
    },
  },
}));

export default makeSource({
  contentDirPath: path.join(process.cwd(), "public", "bitcoin-transcript"),
  documentTypes: [Source, Transcript],
  contentDirExclude: [
    ".github",
    ".gitignore",
    "LICENSE.md",
    "README.md",
    "STYLE.md",
    "twitter_handles.json",
    ".json",
    "2018-08-17-richard-bondi-bitcoin-cli-regtest.es.md",
  ],
  onSuccess: async (importData) => {
    const { allTranscripts, allSources } = await importData();
    organizeTags(allTranscripts);
    createTypesCount(allTranscripts, allSources);
    organizeTopics(allTranscripts);
    getTranscriptAliases(allTranscripts);
    createSpeakers(allTranscripts);
    generateSourcesCount(allTranscripts, allSources);
    organizeContent(allTranscripts);
  },
});
