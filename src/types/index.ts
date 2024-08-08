import { FieldDefs, defineNestedType } from "contentlayer2/source-files";

const Resources = defineNestedType(() => ({
  name: "Resources",
  fields: {
    title: { type: "string" },
    url: { type: "string" },
  },
}));

export const TranscriptFields: FieldDefs | undefined = {
  title: { type: "string" },
  speakers: { type: "list", of: { type: "string" } },
  date: { type: "date" },
  transcript_by: { type: "string" },
  Transcript_by: { type: "string" },
  categories: { type: "list", of: { type: "string" } },
  tag: { type: "list", of: { type: "string" } },
  tags: { type: "list", of: { type: "string" } },
  media: { type: "string" },
  translation_by: { type: "string" },
  episdoe: { type: "number" },
  episode: { type: "number" },
  aliases: { type: "list", of: { type: "string" } },
  vídeo: { type: "string" },
  video: { type: "string" },
  hosts: { type: "list", of: { type: "string" } },
  source: { type: "string" },
  transcription_coverage: { type: "string" },
  summary: { type: "string" },
  needs: { type: "string" },
  aditional_resources: { type: "list", of: Resources },
  additional_resources: { type: "list", of: Resources },
  weight: { type: "number" },
};
