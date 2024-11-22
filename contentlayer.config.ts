import path from "path";
import * as fs from "fs";
import { createSlug, SpeakerData, TopicsData, unsluggify } from "./src/utils";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import {
  Transcript as ContentTranscriptType,
  Source as ContentSourceType,
} from "./.contentlayer/generated/types";
import { LanguageCodes } from "./src/config";

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


function generateTopicsCounts(transcripts: ContentTranscriptType[]) {
  const categories: CategoryInfo[] = getCategories();
  const topicsMap = new Map<string, TopicsData>();
  const categoryMap = new Map<string, CategoryInfo>();
  const topicsByCategory: { [category: string]: TopicsData[] } = {};
  const uncategorizedTopics = new Set<string>();

  // Initialize category map and category arrays
  categories.forEach((cat) => {
    cat.categories.forEach((category) => {
      if (!topicsByCategory[category]) {
        topicsByCategory[category] = [];
      }
    });
    categoryMap.set(createSlug(cat.slug), cat);
    cat.aliases?.forEach((alias) => categoryMap.set(alias, cat));
  });

  // Process all transcripts to build topic counts and names
  transcripts.forEach((transcript) => {
    transcript.tags?.forEach((tag) => {
      const slug = createSlug(tag);
      
      if (!topicsMap.has(slug)) {
        // Get the proper name from categories if it exists
        const categoryInfo = categoryMap.get(slug);
        const name = categoryInfo ? categoryInfo.title : tag;
        
        topicsMap.set(slug, {
          name,
          slug,
          count: 1
        });
      } else {
        const topicInfo = topicsMap.get(slug)!;
        topicInfo.count += 1;
      }
    });
  });

  // Organize topics into categories
  topicsMap.forEach((topicInfo, slug) => {
    const categoryInfo = categoryMap.get(slug);
    
    if (categoryInfo) {
      categoryInfo.categories.forEach((category) => {
        topicsByCategory[category].push(topicInfo);
      });
    } else {
      uncategorizedTopics.add(slug);
    }
  });

  // Add miscellaneous category
  if (uncategorizedTopics.size > 0) {
    topicsByCategory["Miscellaneous"] = Array.from(uncategorizedTopics)
      .map(slug => topicsMap.get(slug)!)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Sort topics within each category
  Object.keys(topicsByCategory).forEach((category) => {
    topicsByCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  // Create alphabetical list of all topics
  const allTopicsArray = Array.from(topicsMap.values())
    .sort((a, b) => a.name.localeCompare(b.name));

  // Write both JSON files
  fs.writeFileSync(
    "./public/topics-by-category-counts.json", 
    JSON.stringify(topicsByCategory, null, 2)
  );
  
  fs.writeFileSync(
    "./public/topics-counts.json", 
    JSON.stringify(allTopicsArray, null, 2)
  );
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

function generateSourcesCount(
  transcripts: ContentTranscriptType[],
  sources: ContentSourceType[]
) {
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
        sources.find(
          (source) =>
            source.language === "en" && source.slugAsParams[0] === slug
        )?.title ?? unsluggify(slug);

      sourcesArray[sourcesLength] = {
        slug,
        name: getSourceName(slug),
        count: 1,
      };
    }
  });

  fs.writeFileSync(
    "./public/source-count-data.json",
    JSON.stringify(sourcesArray)
  );
  return { sourcesArray, slugSources };
}

const createTypesCount = (
  transcripts: ContentTranscriptType[],
  sources: ContentSourceType[]
) => {
  const { sourcesArray, slugSources } = generateSourcesCount(
    transcripts,
    sources
  );
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
          if (nestedTypes[slugType].includes(getSource) || getSource === null)
            return;
          nestedTypes[slugType].push(getSource);
        }
      });
    }
  });

  fs.writeFileSync("./public/types-data.json", JSON.stringify(nestedTypes));
};

function organizeContent(
  transcripts: ContentTranscriptType[],
  sources: ContentSourceType[]
) {
  const tree: any = {};

  sources.forEach((source) => {
    const {
      _id,
      slugAsParams,
      language,
      _raw,
      weight,
      body,
      hosts,
      transcription_coverage,
      url,
      type,
      types,
      ...metaData
    } = source;
    const params = source.slugAsParams;
    const topParam = params[0] as string;
    const nestedSource = params.length > 1;

    if (!tree[topParam]) {
      tree[topParam] = {};
    }
    const allTranscriptsForSourceLanguage = transcripts.filter(
      (transcript) =>
        transcript._raw.sourceFileDir === source._raw.sourceFileDir &&
        transcript.language === language
    );

    const allTranscriptsForSourceLanguageURLs =
      allTranscriptsForSourceLanguage.map((transcript) => transcript.url);

    if (!nestedSource) {
      tree[topParam] = {
        ...tree[topParam],
        [language]: {
          data: allTranscriptsForSourceLanguageURLs.length
            ? allTranscriptsForSourceLanguageURLs
            : {},
          metadata: {
            ...metaData,
          },
        },
      };
    } else {
      tree[topParam][language].data = {
        ...tree[topParam][language].data,
        [params[1]]: {
          data: allTranscriptsForSourceLanguageURLs.length
            ? allTranscriptsForSourceLanguageURLs
            : {},
          metadata: {
            ...metaData,
          },
        },
      };
    }
  });

  fs.writeFileSync("./public/sources-data.json", JSON.stringify(tree, null, 2));
}

const getLanCode = /[.]\w{2}$/gi // Removes the last two characters if there's a dot

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
    language: {
      type: "string",
      resolve: (doc) => {
        const transcript = doc._raw.flattenedPath.split("/").pop();
        const lan = transcript?.match(getLanCode);
        const languageCode = (lan?.[lan.length - 1] || "").replace(".", "");
        const finalLanguage = LanguageCodes.includes(languageCode)
          ? languageCode
          : "en";
        return finalLanguage;
      },
    },
    languageURL: {
      type: "string",
      resolve: (doc) => {
        const transcript = doc._raw.flattenedPath.split("/").pop();
        const fullPathWithoutDot = doc._raw.flattenedPath.replace(
          getLanCode,
          ""
        );

        const lan = transcript?.match(getLanCode);
        const languageCode = (lan?.[0] || "").replace(".", "")

        if (LanguageCodes.includes(languageCode)) {
          return `/${languageCode}/${fullPathWithoutDot}`;
        }

        return `/${fullPathWithoutDot}`;
      },
    },
    slugAsParams: {
      type: "list",
      resolve: (doc) => {
        const pathWithoutDot = doc._raw.flattenedPath.replace(
          getLanCode,
          ""
        );
        return pathWithoutDot.split("/");
      },
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
      resolve: (doc) =>
        `/${doc._raw.flattenedPath.split("/").slice(0, -1).join("/")}`,
    },
    language: {
      type: "string",
      resolve: (doc) => {
        const index = doc._raw.flattenedPath.split("/").pop();
        const lan =
          index?.split(".").length === 2 ? index?.split(".")[1] : "en";
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
  ],
  onSuccess: async (importData) => {
    const { allTranscripts, allSources } = await importData();
    generateTopicsCounts(allTranscripts);
    createTypesCount(allTranscripts, allSources);
    getTranscriptAliases(allTranscripts);
    createSpeakers(allTranscripts);
    generateSourcesCount(allTranscripts, allSources);
    organizeContent(allTranscripts, allSources);
  },
});
