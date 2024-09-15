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
    acc.sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime());

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

export function groupTopicsByAlphabet(
  data: Record<string, TopicsData[]>
): GroupedTopics[] {
  const grouped: { [key: string]: TopicsData[] } = {};
  //  This loops over all tags-data and gets the first letter
  Object.values(data).forEach((titles) => {
    titles.forEach((item) => {
      const firstLetter = item.title.charAt(0).toUpperCase();

      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }

      grouped[firstLetter].push(item);
    });
  });

  // This turns the object  into an array of GroupedTitles
  const result: GroupedTopics[] = Object.keys(grouped)
    .sort()
    .map((letter) => ({
      letter,
      titles: grouped[letter],
    }));

  return result;
}

export function getDoubleDigits(count: number) {
  if (count >= 0 && count <= 9) {
    return `0${count}`;
  }

  return `${count}`;
}

export const getAllCharactersProperty = (
  arrayOfAlphabets: string[],
  groupedTopics: GroupedTopics[]
) => {
  const newData = arrayOfAlphabets.map((alp) => {
    const ifFound = groupedTopics.find((topic) => topic.letter == alp);
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
