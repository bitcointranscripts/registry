import { type Transcript } from "contentlayer/generated";

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

export function shuffle(data: Transcript[]) {
  let currIndex = data.length;

  while (currIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    [data[currIndex], data[randomIndex]] = [data[randomIndex], data[currIndex]];
  }

  return data;
}

export const extractTranscripts = (allTranscripts: Transcript[]) => {
  const transcripts = allTranscripts.filter((transcript) => !!transcript.date);
  const date = new Date();

  const CURRENT_DAY = date.getTime();
  const ONE_DAY = 1000 * 3600 * 24;

  const latestTranscripts = transcripts
    .sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
    .slice(0, 3)
    .map((transcript) => {
      return {
        ...transcript,
        days_opened: Math.floor((CURRENT_DAY - new Date(transcript.date as string).getTime()) / ONE_DAY),
      };
    });

  const featuredTranscripts = getFeaturedTranscripts(transcripts);

  return { latestTranscripts, featuredTranscripts };
};

export const getFeaturedTranscripts = (allTranscripts: Transcript[], callbackFn?: React.Dispatch<React.SetStateAction<Transcript[]>>) => {
  const featuredTranscripts = shuffle(allTranscripts).filter((transcript) => !!transcript.speakers);
  callbackFn && callbackFn(featuredTranscripts.slice(0, 3));

  return featuredTranscripts.slice(0, 3);
};

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
