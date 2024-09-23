import { createSlug } from "./src/utils";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import path from "path";
import * as fs from "fs";
import { Transcript as ContentTranscriptType } from "./.contentlayer/generated/types";

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
  title: string;
  slug: string;
  count: number;
}

/**
 * Count the occurrences of all tags across transcripts and write to json file
 */
function createTagCount(allTranscripts: ContentTranscriptType[]): { tagCounts: Record<string, number> } {
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
    categoryMap.set(cat.slug, cat);
    cat.aliases?.forEach((alias) => categoryMap.set(alias, cat));
  });

  // Process all tags at once
  const allTags = new Set(transcripts.flatMap((transcript) => transcript.tags || []));

  allTags.forEach((tag) => {
    const catInfo = categoryMap.get(tag);
    if (catInfo) {
      catInfo.categories.forEach((category) => {
        if (!tagsByCategory[category].some((t) => t.slug === tag)) {
          tagsByCategory[category].push({
            title: catInfo.title,
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
      title: tag,
      slug: tag,
      count: tagCounts[tag] || 0,
    }));
  }

  // Sort tags alphabetically within each category
  Object.keys(tagsByCategory).forEach((category) => {
    tagsByCategory[category].sort((a, b) => a.title.localeCompare(b.title));
  });

  writeFileSync("./public/tag-data.json", JSON.stringify(tagsByCategory));
  return { tagsByCategory, tagsWithoutCategory };
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
    if (transcript.categories) {
      transcript.categories.forEach((type: string) => {
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
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/"),
    },
  },
}));

export default makeSource({
  contentDirPath: path.join(process.cwd(), "public", "bitcoin-transcript"),
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
    getTranscriptAliases(allDocuments);
  },
});
