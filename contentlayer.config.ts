import { createSlug } from "./src/utils";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";
import { writeFileSync } from "fs";
import path from "path";
import { Transcript as ContentTranscriptType } from "./.contentlayer/generated/types";

const Resources = defineNestedType(() => ({
  name: "Resources",
  fields: {
    title: { type: "string" },
    url: { type: "string" },
  },
}));

/**
 * Count the occurrences of all tags across transcripts and write to json file
 */
function createTagCount(allTranscripts: ContentTranscriptType[]) {
  const tagCount: Record<string, number> = {};
  allTranscripts.forEach((file) => {
    if (file.tags) {
      file.tags.forEach((tag: string) => {
        const formattedTag = createSlug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });
  writeFileSync("./public/tag-data.json", JSON.stringify(tagCount));
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
    createTagCount(allDocuments);
    createTypesCount(allDocuments);
  },
});
