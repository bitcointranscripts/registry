import { type Transcript } from "contentlayer/generated";

export interface ContentTree {
  [key: string]: ContentTree | Transcript[];
}
export type TopicsData = {
  name: string;
  slug: string;
  count: number;
};

export type SpeakerData = {
  name: string;
  slug: string;
  count: number;
};

export type ContentData = {
  name: string;
  slug: string;
  count: number;
}

type  ContentKeys = {
  [key: string]: ContentData[];
};

export type DepreciatedCategories = "tags" | "speakers" | "categories"

export type GroupedData = Record<string, TopicsData[] | SpeakerData[]>;

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
  const CURRENT_DAY = Date.now();
  const ONE_DAY = 86_400_000; // 1000 * 3600 * 24

  const languageCodes = ["zh", "es", "pt"];
  const languageRegex = new RegExp(`\\.(${languageCodes.join("|")})(\\.md)?$`);

  const transcripts = shuffle(allTranscripts).filter((transcript) => {
    return transcript.date && !languageRegex.test(transcript.url);
  });

  // Sort and slice in one pass
  const latestTranscripts = transcripts.reduce((acc, transcript) => {
    const transcriptDate = new Date(transcript.date as string).getTime();
    const days_opened = Math.floor((CURRENT_DAY - transcriptDate) / ONE_DAY);

    acc.push({ ...transcript, days_opened });
    acc.sort(
      (a, b) =>
        new Date(b.date as string).getTime() -
        new Date(a.date as string).getTime()
    );

    if (acc.length > 3) acc.pop();
    return acc;
  }, [] as (Transcript & { days_opened: number })[]);

  const featuredTranscripts = getFeaturedTranscripts(transcripts);

  return { latestTranscripts, featuredTranscripts };
};

export const getFeaturedTranscripts = (allTranscripts: Transcript[]) => {
  const featuredTranscripts = allTranscripts
    .filter((transcript) => transcript.speakers)
    .sort(() => Math.random() - 0.5)
    .slice(0, 60);

  return featuredTranscripts;
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

export function groupDataByAlphabet(
  items: TopicsData[] | SpeakerData[]
): Record<string, TopicsData[]> {
  return items
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .reduce((acc, item) => {
      const firstLetter = item.slug.charAt(0).toUpperCase();

      // Check if the first character is a digit
      if (!isNaN(Number(firstLetter))) {
        if (!acc['#']) {
          acc['#'] = [];
        }
        // Add the current item to the '#' group
        acc['#'].push(item);
      } else {
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        // Add the current item to the correct group
        acc[firstLetter].push(item);
      }

      return acc;
    }, {} as Record<string, TopicsData[]>);
}

export function getDoubleDigits(count: number) {
  if (count >= 0 && count <= 9) {
    return `0${count}`;
  }

  return `${count}`;
}

export const getAllCharactersProperty = (
  arrayOfAlphabets: string[],
  groupedTopics: GroupedData |  never[]
) => {
  const newData = arrayOfAlphabets.map((alp) => {
    const ifFound = Object.entries(groupedTopics).find(
      (topic) => topic[0] === alp
    );
    if (ifFound) {
      return {
        alp,
        isDisabled: false,
      };
    }
    return {
      alp,
      isDisabled: true,
    };
  });

  return newData;
};


export const sortKeysAlphabetically = (data:ContentKeys  ): ContentKeys => {
  const sortedKeys = Object.keys(data).sort((a, b) => a.localeCompare(b));

  const sortedData: ContentKeys = {};
  sortedKeys.forEach((key) => {
      sortedData[key] = data[key];
  });

  return sortedData;
};