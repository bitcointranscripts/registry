import type { Transcript } from "contentlayer/generated";
import fs from "fs";
import path from "path";

export interface ContentTree {
  [key: string]: ContentTree | Transcript[];
}

export function organizeContent(transcripts: Transcript[]): ContentTree {
  const tree: ContentTree = {};

  transcripts.forEach((transcript) => {
    const parts = transcript.slugAsParams;
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as ContentTree;
    }

    const lastName = parts[parts.length - 1];
    if (!(lastName in current)) {
      current[lastName] = [];
    }
    (current[lastName] as Transcript[]).push(transcript);
  });

  return tree;
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

interface SpeakerData {
  count: number;
  fullName: string;
}

export function getSpeakers(): {
  [key: string]: SpeakerData;
} {
  const filePath = path.join(process.cwd(), "public", "speaker-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

// Helper function to read speaker data from JSON file
export function getSpeakerData(slug: string): SpeakerData | null {
  return getSpeakers()[slug] || null;
}

export function getTags(): {
  [key: string]: number;
} {
  const filePath = path.join(process.cwd(), "public", "tag-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}
