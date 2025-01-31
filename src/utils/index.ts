import { Markdown, type Transcript } from "contentlayer/generated";
import { alphabeticalArrangement, ContentTreeArray } from "./data";
import { LanguageCode, LanguageCodes, OtherSupportedLanguages } from "../config";

export interface ContentTree {
  [key: string]: ContentTree | Transcript[];
}
export type FieldCountItem = {
  name: string;
  slug: string;
  count: number;
};

export type TagsDetailed  = {
  name: string;
  slug: string;
  count?: number;
};

export type NavigationList = {
  name: string;
  slug: string;
  nested?: boolean;
};

export type ExploreGroupedData = {
  name: string;
  slug: string;
  count?: number;
  nested?: ExploreGroupedData[]; // For nested headings in Transcripts Optional
};

type ContentKeys = {
  [key: string]: FieldCountItem[];
};

export type DepreciatedCategories =
  | "tags"
  | "speakers"
  | "categories"
  | "sources"
  | "types";

export type GroupedData = Record<string, FieldCountItem[]>;

export function shuffle(data: Transcript[]) {
  let currIndex = data.length;

  while (currIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    [data[currIndex], data[randomIndex]] = [data[randomIndex], data[currIndex]];
  }

  return data;
}

export const extractTranscripts = (allTranscripts: Transcript[], languageCode: LanguageCode) => {
  const CURRENT_DAY = Date.now();
  const ONE_DAY = 86_400_000; // 1000 * 3600 * 24

  // Optimization for landingpage — obscene amount of data passed to the client (reduced from 6.6s to 795ms)
  const lightWeightTranscripts = allTranscripts.map(({ body, summary, ...fieldsToUse }) => {
    return {...fieldsToUse}
  })

  const transcripts = shuffle(lightWeightTranscripts as Transcript[]).filter((transcript) => {
    return transcript.date && transcript.language === languageCode;
  });

  // Sort and slice in one pass
  const latestTranscripts = transcripts.reduce(
    (acc, transcript) => {
      const transcriptDate = new Date(transcript.date as string).getTime();
      const days_opened = Math.floor((CURRENT_DAY - transcriptDate) / ONE_DAY);

      acc.push({ ...transcript, days_opened });
      acc.sort(
        (a, b) =>
          new Date(b.date as string).getTime() -
          new Date(a.date as string).getTime(),
      );

      if (acc.length > 3) acc.pop();
      return acc;
    },
    [] as (Transcript & { days_opened: number })[],
  );

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
// Make Data Sorted According to Alphabet [{name: "A", slug:"a", nested: [{name: "ABC", count: 1}]}
export function groupDataByAlphabet(
  items: ExploreGroupedData[],
): ExploreGroupedData[] {
  let groupedItems: ExploreGroupedData[] = [];
  /// alphabeticalArrangement
  for (let alp of alphabeticalArrangement) {
    groupedItems.push({
      name: alp,
      slug: createContentSlug(alp == "#" ? "~%" : alp),
      nested: [],
    });
    for (let item of items) {
      let firstLetter =
        item.name.charAt(0).toUpperCase() === "0"
          ? "#"
          : item.name.charAt(0).toUpperCase();
      if (firstLetter === alp) {
        groupedItems?.[groupedItems.length - 1]?.nested?.push(item);
      }
    }
  }
  return groupedItems.sort((a, b) => a.name.localeCompare(b.name));
}

export function getDoubleDigits(count: number) {
  if (count >= 0 && count <= 9) {
    return `0${count}`;
  }

  return `${count}`;
}

export const sortKeysAlphabetically = (
  items: ExploreGroupedData[],
): ExploreGroupedData[] => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
};

export const unsluggify = (slug: string) => slug.replace(/-/g, " ");

export const saneCapitalization = (slug: string) => unsluggify(slug).split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")

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
  const text = args.raw
    .replace(/<http[^>]+>|https?:\/\/[^\s]+|##+/g, "")
    .trim();
  return text.length > 300 ? text.slice(0, 300) + "..." : text;
};

export const sortObjectAndArrays = (args: {
  [category: string]: FieldCountItem[];
}) => {
  return Object.fromEntries(
    Object.entries(args)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        value.sort((a, b) => a.name.localeCompare(b.name)),
      ]),
  );
};

export const countItemsAndSort = (args: { [category: string]: FieldCountItem[] }) => {
  const countObject: { [key: string]: number } = {};

  Object.entries(args).map(([key, value]) => {
    countObject[key] = value.reduce((acc, curr) => acc + curr.count, 0);
  });

  const sortObject: { [key: string]: number } = Object.keys(countObject)
    .sort()
    .reduce(
      (acc, curr) => {
        acc[curr] = countObject[curr];
        return acc;
      },
      {} as typeof countObject,
    );
  return sortObject;
};

export const constructSlugPaths = (slug: string[]) => {
  // receives a slug array e.g [ 'es', 'sources' ], [ 'andreas-autonopolous' ] note: 'en' is not included in the array

  const isEnglishSlug =
    slug[0].length > 2 && !OtherSupportedLanguages.includes(slug[0] as LanguageCode);
  const englishSlug = ["en", ...slug];
  const newSlug = isEnglishSlug ? [...englishSlug] : [...slug];

  // swap languageCode index in slug, ['es', 'sources'] -> ['sources', 'es']
  [newSlug[0], newSlug[1]] = [newSlug[1], newSlug[0]];

  let slugPaths = newSlug;
  const addDataKeyToSlug = [
    ...slugPaths.slice(0, 2),
    "data",
    ...slugPaths.slice(2),
  ];
  slugPaths = slugPaths.length >= 3 ? addDataKeyToSlug : slugPaths;

  return { slugPaths };
};

export const convertSlugToLanguageSlug = (slug: string[]) => {
  // converts  [ 'sources' ] to [ 'en', 'sources' ], or [ 'es', 'sources' ] to [ 'es', 'sources' ] (leaving the language code intact)
  const isEnglishSlug =
    slug[0].length > 2 && !OtherSupportedLanguages.includes(slug[0] as LanguageCode);
  return isEnglishSlug ? [LanguageCode.en, ...slug] : [...slug];
}

export const fetchTranscriptDetails = (
  allTranscripts: Transcript[],
  paths: string[],
  isRoot: boolean,
) => {
  if (!isRoot || paths.length === 0) return { transcripts: [] };

  const transcripts = allTranscripts.reduce((acc, curr) => {
    const {
      url,
      title,
      speakers,
      date,
      tagsDetailed,
      _raw,
      summary,
      body,
      languageURL,
      language
    } = curr;

    if (paths.includes(url)) {
      acc.push({
        title,
        speakers,
        date,
        tagsDetailed,
        languageURL,
        sourceFilePath: _raw.sourceFilePath,
        flattenedPath: _raw.flattenedPath,
        summary,
        body: createText(body),
        language
      });
    }
    return acc.sort((a, b) => {
      const sortByTime =
        new Date(b.date!).getTime() - new Date(a.date!).getTime();
      const sortByTitle = a.title.localeCompare(b.title);

      return sortByTime || sortByTitle;
    });
  }, [] as Array<ContentTreeArray>);

  return {
    transcripts,
  };
};

export const deriveSourcesList = (languageTree: any) => {
  // This function derives a list of sources based on the provided input data which is nested tree o.
  // It processes the input to return the slug, name and count of the source.

  const getValues = Object.entries(languageTree).map(([key, value]) => {
    const valDetails = (value as unknown as any).data;
    const extractCount = (arr: {} | []) => {
      let count: number = 0;

      if (Array.isArray(arr)) {
        count = arr.length;
      } else {
        let initialCount = 0;

        const keysPresent = Object.keys(valDetails);
        keysPresent.forEach((key) => {
          const item = valDetails[key]?.data.length;
          initialCount += item;
        });
        count = initialCount;
      }

      return count;
    };

    return {
      slug: key,
      name: (value as unknown as any)?.metadata.title,
      count: extractCount(valDetails),
    };
  });

  return getValues;
};

export function extractHeadings(text: string): NavigationList[] {
  const lines: string[] = text.split("\n");
  const getHeadingOneTwo = /^#{1,2}\s/;
  const getOnlyHeadingThree = /^#{3}\s/;
  const headings: NavigationList[] = [];

  lines.forEach((line) => {
    if (getHeadingOneTwo.test(line)) {
      let title = line.trim().replace(getHeadingOneTwo, "");
      headings.push({ name: title, slug: createContentSlug(title) });
    } else if (getOnlyHeadingThree.test(line)) {
      let title = line.trim().replace(getOnlyHeadingThree, "");
      headings.push({
        name: title,
        slug: createContentSlug(title),
        nested: true,
      });
    }
  });

  return headings;
}

export const getLangCode = (languageFromPath?: string) : Error | LanguageCode => {
  if (!languageFromPath) {
    return LanguageCode.en;
  }
  const isSupportedLanguage = LanguageCodes.includes(languageFromPath as LanguageCode);
  if (!isSupportedLanguage) {
    return new Error(`Language code ${languageFromPath} is not supported`);
  }
  return languageFromPath as LanguageCode;
}

export const deriveAlternateLanguages = ({languageCode, languages, suffix}: {languageCode: LanguageCode, languages: LanguageCode[], suffix: string}) => {
  const alternateLanguages = languages.filter(lang => lang !== languageCode);

  const metadataLanguages = alternateLanguages.reduce((acc, language) => {
    const alternateUrl = language === LanguageCode.en ? `/${suffix}` : `/${language}/${suffix}`;
    acc[language] = alternateUrl;
    return acc;
  }, {} as Record<string, string>);
  return {alternateLanguages, metadataLanguages};
}


// To load fonts on the server side

export async function loadManropeFont(base:string) {

  const regularFontData = await fetch(
    new URL("/fonts/Manrope-Medium.ttf",base)
  ).then((res) => res.arrayBuffer());

  const boldFontData = await fetch(
    new URL("/fonts/Manrope-SemiBold.ttf",base)
  ).then((res) => res.arrayBuffer());

  return { regularFontData, boldFontData };
}

//  Needed to truncate text for Image Response Line Clamp doesn't work on Image Response
export const truncateText = (text: string, maxLines: number, maxCharsPerLine: number) => {
  const words = text.split(" ");
  let lines = [""];

  for (const word of words) {
    let currentLine = lines[lines.length - 1];

    if ((currentLine + " " + word).length <= maxCharsPerLine) {
      lines[lines.length - 1] = currentLine ? currentLine + " " + word : word;
    } else {
      if (lines.length < maxLines) {
        lines.push(word);
      } else {
        lines[lines.length - 1] += "...";
        break;
      }
    }
  }

  return lines.join("\n");
};
