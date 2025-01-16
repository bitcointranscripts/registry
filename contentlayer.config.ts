import path from "path";
import * as fs from "fs";
import {
  createSlug,
  FieldCountItem,
  unsluggify,
} from "./src/utils";
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
export interface Topic {
  title: string;
  slug: string;
  optech_url: string;
  categories: string[];
  aliases?: string[];
  excerpt: string;
}

// The full processed topic we use internally
interface ProcessedTopic {
  name: string; // Display name (from topic.title or original tag)
  slug: string; // Slugified identifier
  count: number; // Number of occurrences
  categories: string[]; // List of categories it belongs to
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

const getTopics = () => {
  const filePath = path.join(process.cwd(), "public", "topics.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};


function buildTopicsMap(
  transcripts: ContentTranscriptType[],
  topics: Topic[]
): Map<string, ProcessedTopic> {
  // Create topics lookup map (includes aliases)
  const topicsLookup = new Map<string, Topic>();
  topics.forEach((topic) => {
    topicsLookup.set(topic.slug, topic);
    topic.aliases?.forEach((alias) => topicsLookup.set(alias, topic));
  });

  // Build the main topics map
  const processedTopics = new Map<string, ProcessedTopic>();

  // Process all transcripts
  transcripts.forEach((transcript) => {
    transcript.tags?.forEach((tag) => {
      const slug = createSlug(tag);
      const topic = topicsLookup.get(slug);

      if (!processedTopics.has(slug)) {
        processedTopics.set(slug, {
          name: topic?.title || tag,
          slug,
          count: 1,
          categories: topic?.categories || ["Miscellaneous"],
        });
      } else {
        const processed = processedTopics.get(slug)!;
        processed.count += 1;
      }
    });
  });
  return processedTopics;
}

function generateAlphabeticalList(
  processedTopics: Map<string, ProcessedTopic>
): FieldCountItem[] {
  const result: FieldCountItem[] = [];
  // The categories property is not needed for this list, so we drop it
  for (const { name, slug, count } of processedTopics.values()) {
    result.push({ name, slug, count });
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function generateCategorizedList(
  processedTopics: Map<string, ProcessedTopic>
): Record<string, FieldCountItem[]> {
  const categorizedTopics: Record<string, FieldCountItem[]> = {};

  Array.from(processedTopics.values()).forEach(
    ({ name, slug, count, categories }) => {
      categories.forEach((category) => {
        if (!categorizedTopics[category]) {
          categorizedTopics[category] = [];
        }

        // Check if topic name contains category name and ends with "(Miscellaneous)"
        const modifiedName =
          name.includes(category) && name.endsWith("(Miscellaneous)")
            ? "Miscellaneous"
            : name;

        categorizedTopics[category].push({ name: modifiedName, slug, count });
      });
    }
  );

  // Sort topics within each category
  Object.values(categorizedTopics).forEach((topics) => {
    topics.sort((a, b) => {
      if (a.name == "Miscellaneous") return 1;
      if (b.name == "Miscellaneous") return -1;
      return a.name.localeCompare(b.name);
    });
  });

  return categorizedTopics;
}

function generateTopicsCounts(transcripts: ContentTranscriptType[]) {
  // Get topics
  const topics = getTopics();

  // Build the primary data structure
  const processedTopics = buildTopicsMap(transcripts, topics);

  // Generate both output formats
  const alphabeticalList = generateAlphabeticalList(processedTopics);
  const categorizedList = generateCategorizedList(processedTopics);

  // Write output files
  fs.writeFileSync(
    "./public/topics-counts.json",
    JSON.stringify(alphabeticalList, null, 2)
  );

  fs.writeFileSync(
    "./public/topics-by-category-counts.json",
    JSON.stringify(categorizedList, null, 2)
  );
}

function createSpeakers(transcripts: ContentTranscriptType[]) {
  const slugSpeakers: any = {};
  const speakerArray: FieldCountItem[] = [];

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

const getLanCode = /[.]\w{2}$/gi; // Removes the last two characters if there's a dot

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
    tagsDetailed: {
      type: "list",
      resolve: (doc) => {
         // doc?.tags doesn't give an array in contentLayer so we do  _array to get it
        const topicsStore = doc?.tags as any || [];
        const topics = (topicsStore?._array as string[]) ?? [];

        const topicsWithTitles = topics.map((topic) => {
          const currentTopic = getTopics().find(
            (topicData: FieldCountItem) => topicData.slug === topic
          );

          if(currentTopic?.title && currentTopic?.title.includes("(Miscellaneous)")) {
            return {
              name: currentTopic?.title.replace("(Miscellaneous)",""),
              slug: currentTopic.slug,
            }
          }
          return {
              name: currentTopic?.title || topic,
              slug: currentTopic?.slug || topic,
          };
        });
        return topicsWithTitles;
      },
    },
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
        const languageCode = (lan?.[0] || "").replace(".", "");

        if (LanguageCodes.includes(languageCode)) {
          return `/${languageCode}/${fullPathWithoutDot}`;
        }

        return `/${fullPathWithoutDot}`;
      },
    },
    slugAsParams: {
      type: "list",
      resolve: (doc) => {
        const pathWithoutDot = doc._raw.flattenedPath.replace(getLanCode, "");
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
