import type { Transcript } from "contentlayer/generated";

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
