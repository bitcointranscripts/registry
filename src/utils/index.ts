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
  count?: number;
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

const getSourceFromTranscript = (data: Transcript, SourceCountData:ContentData[]) =>
  SourceCountData.find((source) => source.slug === data.slugAsParams[0])?.name ?? (data.slugAsParams as Array<string>)[0];

export const extractTranscripts = (allTranscripts: Transcript[],SourceCountData:ContentData[]) => {
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
    const daysOpened = Math.floor((CURRENT_DAY - transcriptDate) / ONE_DAY);

    acc.push({ ...transcript, daysOpened, sourceName: getSourceFromTranscript(transcript, SourceCountData) });
    acc.sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime());

    if (acc.length > 3) acc.pop();
    return acc;
  }, [] as (Transcript & { daysOpened: number; sourceName: string })[]);

  const featuredTranscripts = getFeaturedTranscripts(transcripts, SourceCountData);

  return { latestTranscripts, featuredTranscripts };
};

export const getFeaturedTranscripts = (allTranscripts: Transcript[],SourceCountData:ContentData[]) => {
  let featuredTranscripts: (Transcript & { sourceName: string })[] = [];

  for (const transcript of allTranscripts) {
    if (transcript.speakers) {
      featuredTranscripts.push({ ...transcript, sourceName: getSourceFromTranscript(transcript, SourceCountData) });
    }
  }

  featuredTranscripts = featuredTranscripts.sort(() => Math.random() - 0.5).slice(0, 60);
  return featuredTranscripts;
};

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/gi, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// This is needed to handle different languages slug for individual content and not clear them out
export function createContentSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\p{L}\p{N}\-_]+/giu, "") // Remove all non-alphanumeric characters except hyphen
    .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphens from the start
    .replace(/-+$/, ""); // Trim hyphens from the end
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

export const constructSlugPaths = (slug: string[]) => {
  const languageCodes = ["zh", "es", "pt"];
  const isEnglishSlug = slug[0] !== "en" && slug[0].length > 2 && !languageCodes.includes(slug[0]);
  const englishSlug = ["en", ...slug];
  const newSlug = isEnglishSlug ? [...englishSlug] : [...slug];
  [newSlug[0], newSlug[1]] = [newSlug[1], newSlug[0]];

  let slugPaths = newSlug;
  const addDataKeyToSlug = [...slugPaths.slice(0, 2), "data", ...slugPaths.slice(2)];
  slugPaths = slugPaths.length >= 3 ? addDataKeyToSlug : slugPaths;

  return { slugPaths };
};

export const fetchTranscriptDetails = (allTranscripts: Transcript[], paths: string[], isRoot: boolean) => {
  if (!isRoot || paths.length === 0) return { transcripts: [] };

  const transcripts = allTranscripts.reduce((acc, curr) => {
    const { url, title, speakers, date, tags, _raw, summary, body, languageURL } = curr;

    if (paths.includes(url)) {
      acc.push({
        title,
        speakers,
        date,
        tags,
        languageURL,
        sourceFilePath: _raw.sourceFilePath,
        flattenedPath: _raw.flattenedPath,
        summary,
        body: createText(body),
      });
    }
    return acc.sort((a, b) => {
      const sortByTime = new Date(b.date!).getTime() - new Date(a.date!).getTime();
      const sortByTitle = a.title.localeCompare(b.title);

      return sortByTime || sortByTitle;
    });
  }, [] as Array<ContentTreeArray>);

  return {
    transcripts,
  };
};

export function extractHeadings(text: string): string[] {
  const lines: string[] = text.split('\n');
  const headings: string[] = [];

  lines.forEach(line => {
      if (/^#{1,2}\s/.test(line)) {
          headings.push(line.trim());
      }
  });

  return headings;
}