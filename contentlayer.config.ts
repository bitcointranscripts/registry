import { createSlug, SpeakerData, TopicsData, unsluggify } from "./src/utils";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import path from "path";
import * as fs from "fs";
import { Transcript as ContentTranscriptType, Markdown } from "./.contentlayer/generated/types";

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

  writeFileSync("./public/aliases.json", JSON.stringify(aliases));
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

  writeFileSync("./public/tag-data.json", JSON.stringify(tagsByCategory));
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

  writeFileSync("./public/topics-data.json", JSON.stringify(topicsArray));
}
/**
 * Count the occurrences of all types across transcripts and write to json file
 */
const createTypesCount = (allTranscripts: ContentTranscriptType[]) => {
  const typesAndCount: Record<string, number> = {};
  const relevantTypes = [
    "video",
    "core-dev-tech",
    "podcast",
    "conference",
    "meeting",
    "club",
    "meetup",
    "hackathon",
    "workshop",
    "residency",
    "developer-tools",
  ];

  allTranscripts.forEach((transcript) => {
    if (transcript.types) {
      transcript.types.forEach((type: string) => {
        const formattedType = createSlug(type);
        if (relevantTypes.includes(formattedType)) {
          if (formattedType in typesAndCount) {
            typesAndCount[formattedType] += 1;
          } else {
            typesAndCount[formattedType] = 1;
          }
        }
      });
    }
  });

  writeFileSync("./public/types-data.json", JSON.stringify(typesAndCount));
};

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

  writeFileSync("./public/speaker-data.json", JSON.stringify(speakerArray));
}

function generateSourcesCount(transcripts: ContentTranscriptType[]) {
  const sourcesArray: TagInfo[] = [];
  const slugSources: Record<string, number> = {};

  transcripts.forEach((transcript) => {
    const slug = transcript._raw.flattenedPath.split("/")[0];
    const isValid = !!transcript.date;

    if (isValid) {
      if (slugSources[slug] !== undefined) {
        sourcesArray[slugSources[slug]].count += 1;
      } else {
        const sourcesLength = sourcesArray.length;
        slugSources[slug] = sourcesLength;
        sourcesArray[sourcesLength] = {
          slug,
          name: unsluggify(slug),
          count: 1,
        };
      }
    }
  });

  writeFileSync("./public/source-count-data.json", JSON.stringify(sourcesArray));
}

function organizeContent(transcripts: ContentTranscriptType[]) {
  const tree: ContentTree = {};

  transcripts.forEach((transcript) => {
    const parts = transcript.slugAsParams;
    let current = tree;

    const isNonEnglishDir = /\w+\.[a-z]{2}\b/.test(parts[parts.length - 1]);
    if (isNonEnglishDir) {
      return;
    }
    const loopSize = parts.length === 2 ? parts.length - 1 : parts.length - 2;

    for (let i = 0; i < loopSize; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }

      current = current[parts[i]] as ContentTree;

      const penultimateKey = parts[loopSize];

      if (!Array.isArray(current[penultimateKey])) {
        current[penultimateKey] = [];
      }

      const createText = (args: Markdown) => {
        const text = args.raw.replace(/<http[^>]+>|https?:\/\/[^\s]+|##+/g, "").trim();

        return text.length > 300 ? text.slice(0, 300) + "..." : text;
      };

      (current[penultimateKey] as any[]).push({
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
    }
  });

  // Save the result as JSON
  writeFileSync("./public/sources-data.json", JSON.stringify(tree, null, 2));
}

const allowedFields = [
  "title",
  "date",
  "summary",
  "episode",
  "additional_resources",
  "speakers",
  "tags",
  "media",
  "source_file",
  "transcript_by",
  "categories",
  "aliases",
  "translation_by",
  "needs",
];

export const Transcript = defineDocumentType(() => ({
  name: "Transcript",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date" },
    summary: { type: "string" },
    episode: { type: "number" },
    additional_resources: { type: "list", of: Resources },
    speakers: { type: "list", of: { type: "string" } },
    tags: { type: "list", of: { type: "string" } },
    media: { type: "string" },
    source_file: { type: "string" },
    transcript_by: { type: "string" },
    categories: { type: "list", of: { type: "string" } },
    aliases: { type: "list", of: { type: "string" } },
    translation_by: { type: "string" },
    needs: { type: "string" },
    types: { type: "list", of: { type: "string" } },
    source: { type: "string" },
    website: { type: "string" },
    weight: { type: "number" },
    hosts: { type: "list", of: { type: "string" } },
    transcription_coverage: { type: "string" },

    // title: { type: "string", required: true },
    // speakers: { type: "list", of: { type: "string" } },
    // date: { type: "date" },
    // transcript_by: { type: "string" },
    // Transcript_by: { type: "string" },
    // categories: { type: "list", of: { type: "string" } },
    // tag: { type: "list", of: { type: "string" } },
    // tags: { type: "list", of: { type: "string" } },
    // media: { type: "string" },
    // translation_by: { type: "string" },
    // episode: { type: "number" },
    // aliases: { type: "list", of: { type: "string" } },
    // video: { type: "string" },
    // hosts: { type: "list", of: { type: "string" } },
    // source: { type: "string" },
    // transcription_coverage: { type: "string" },
    // summary: { type: "string" },
    // needs: { type: "string" },
    // aditional_resources: { type: "list", of: Resources },
    // additional_resources: { type: "list", of: Resources },
    // weight: { type: "number" },
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

export default makeSource({
  contentDirPath: path.join(process.cwd(), "public", "refine-taxonomies"),
  documentTypes: [Transcript],
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
    const { allDocuments } = await importData();
    organizeTags(allDocuments);
    createTypesCount(allDocuments);
    organizeTopics(allDocuments);
    getTranscriptAliases(allDocuments);
    createSpeakers(allDocuments);
    generateSourcesCount(allDocuments);
    organizeContent(allDocuments);
  },
});
