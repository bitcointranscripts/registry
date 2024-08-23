import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import path from "path";
import { createSlug } from "./src/utils";
import { writeFileSync } from "fs";

const Resources = defineNestedType(() => ({
  name: "Resources",
  fields: {
    title: { type: "string" },
    url: { type: "string" },
  },
}));

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

/**
 * Count the occurrences of all tags across transcripts and write to json file
 * TODO: find a way to remove the any[] type
 */
function createTagCount(allTranscripts: any[]) {
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
 * Count the occurrences of all speakers across transcripts and write to json file
 * Also store the actual name of the speaker alongside the slugified version.
 * TODO: find a way to remove the any[] type
 */
function createSpeakerCount(allTranscripts: any[]) {
  const speakerCount: Record<string, { count: number, fullName: string }> = {};
  
  allTranscripts.forEach((file) => {
    if (file.speakers) {
      file.speakers.forEach((speaker: string) => {
        const formattedSpeaker = createSlug(speaker);
        
        if (formattedSpeaker in speakerCount) {
          speakerCount[formattedSpeaker].count += 1;
        } else {
          speakerCount[formattedSpeaker] = {
            count: 1,
            fullName: speaker // Store the actual name of the speaker
          };
        }
      });
    }
  });

  writeFileSync("./public/speaker-data.json", JSON.stringify(speakerCount));
}

export default makeSource({
  contentDirPath: path.join(process.cwd(), "public", "bitcoin-transcript"),
  documentTypes: [Transcript],
  onSuccess: async (importData) => {
    const { allDocuments } = await importData();
    createTagCount(allDocuments);
    createSpeakerCount(allDocuments);
  },
});
