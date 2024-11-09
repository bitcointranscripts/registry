import { Markdown, type Transcript } from "contentlayer/generated";
import { ContentTreeArray } from "./data";

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
};

interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

type ContentKeys = {
  [key: string]: ContentData[];
};

export type DepreciatedCategories = "tags" | "speakers" | "categories" | "sources" | "types";

export type GroupedData = Record<string, TopicsData[] | SpeakerData[]>;

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

export function groupDataByAlphabet(items: TopicsData[] | SpeakerData[]): Record<string, TopicsData[]> {
  return items
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .reduce((acc, item) => {
      const firstLetter = item.slug.charAt(0).toUpperCase();

      // Check if the first character is a digit
      if (!isNaN(Number(firstLetter))) {
        if (!acc["#"]) {
          acc["#"] = [];
        }
        // Add the current item to the '#' group
        acc["#"].push(item);
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

export const getAllCharactersProperty = (arrayOfAlphabets: string[], groupedTopics: GroupedData | never[]) => {
  const newData = arrayOfAlphabets.map((alp) => {
    const ifFound = Object.entries(groupedTopics).find((topic) => topic[0] === alp);
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

export const sortKeysAlphabetically = (data: ContentKeys): ContentKeys => {
  const sortedKeys = Object.keys(data).sort((a, b) => a.localeCompare(b));

  const sortedData: ContentKeys = {};
  sortedKeys.forEach((key) => {
    sortedData[key] = data[key];
  });

  return sortedData;
};

export const unsluggify = (slug: string) => slug.replace(/-/g, " ");

export const formatDate = (dateString: string): string | null => {
  if (!dateString) return null;

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export function loopArrOrObject(arr: {} | ContentTreeArray[]) {
  let filterIndex: any[] = [];

  if (Array.isArray(arr)) {
    filterIndex = arr;
  } else {
    filterIndex = Object.entries(arr).map(([key, values]) => ({
      route: key,
      title: (values as unknown as any).metadata.title,
      count: (values as unknown as any).data.length,
    }));
  }

  return filterIndex;
}

export const showOnlyEnglish = (args: ContentTreeArray[]) => {
  const languageCodes = ["zh", "es", "pt"];
  const languageRegex = new RegExp(`\\.(${languageCodes.join("|")})(\\.md)?$`);

  const transcripts = args.filter((transcript) => {
    return !languageRegex.test(transcript.flattenedPath);
  });

  return transcripts;
};

export const extractDirectoryData = (data: any[]) => {
  if (!Array.isArray(data)) return { directoryData: null };

  const directoryData = data.find((item) => {
    const url = item.flattenedPath.split("/");
    return url[url.length - 1] === "_index";
  });

  return { directoryData };
};

export const createText = (args: Markdown) => {
  const text = args.raw.replace(/<http[^>]+>|https?:\/\/[^\s]+|##+/g, "").trim();
  return text.length > 300 ? text.slice(0, 300) + "..." : text;
};

export const sortObjectAndArrays = (args: { [category: string]: TagInfo[] }) => {
  return Object.fromEntries(
    Object.entries(args)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [key, value.sort((a, b) => a.name.localeCompare(b.name))])
  );
};

export const countItemsAndSort = (args: { [category: string]: TagInfo[] }) => {
  const countObject: { [key: string]: number } = {};

  Object.entries(args).map(([key, value]) => {
    countObject[key] = value.reduce((acc, curr) => acc + curr.count, 0);
  });

  const sortObject: { [key: string]: number } = Object.keys(countObject)
    .sort()
    .reduce((acc, curr) => {
      acc[curr] = countObject[curr];
      return acc;
    }, {} as typeof countObject);
  return sortObject;
};

export function extractListOfHeadings(text: string): string[] {
  const lines: string[] = text.split('\n');
  const headings: string[] = [];

  lines.forEach(line => {
      if (line.match(/^[#]+\s+\w+/gi)) {
          headings.push(line.trim());
      }
  });

  return headings;
}