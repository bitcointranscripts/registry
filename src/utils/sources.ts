import { BaseCrumbType } from "../components/common/BaseCrumbLists";
import { LanguageCode } from "../config";
import { NestedSource, SourceData, SourceTree } from "../types";

type GetSourceBreadcrumbsFromSlugProps = {
  slug: string[];
  list?: BaseCrumbType[];
  current: SourceTree | NestedSource<string> | string[];
  language?: LanguageCode;
  idx?: number;
  link?: string;
  activeRoute?: string;
};

// derives the breadcrumbs data for a given source slug
export function getSourceBreadcrumbsFromSlug({
  slug,
  list = [],
  current,
  language = LanguageCode.en,
  idx = 0,
  link = "",
}: GetSourceBreadcrumbsFromSlugProps): BaseCrumbType[] {
  if (slug.length === 0) {
    return list;
  }
  if (Array.isArray(current)) {
    return list;
  }
  const path = slug.shift();
  if (path === undefined) {
    return list;
  }

  let pathContent = {} as SourceData;

  if (idx === 0) {
    pathContent = (current as SourceTree)[path][language];
  } else {
    pathContent = (current as NestedSource<string>)[path];
  }

  const title = pathContent.metadata.title;
  const data = pathContent.data;

  if (!title || !data) {
    return list;
  }

  const pathWithLanguage = language !== "en" ? `/${language}/${path}` : path;

  list.push({
    name: title,
    link: `${link || pathWithLanguage}`,
    isActive: false,
  });

  return getSourceBreadcrumbsFromSlug({
    slug,
    list,
    current: data,
    language,
    idx: idx + 1,
    link: `${pathWithLanguage}/${slug[0]}`,
  });
}

export const findAlternateLanguageForTranscript = (slug: string[], language: LanguageCode, sources: SourceTree) => {
  const alternateLanguages: string[] = [];
  
  if (slug.length === 0) return alternateLanguages;

  const transcriptUrl = `/${slug.join("/")}`;

  const clonedSlug = [...slug];

  const sourceId = clonedSlug.shift()!;
  clonedSlug.pop();

  const source = sources[sourceId];

  // console.log({source, sourceId, language, transcriptUrl})

  if (!source) return alternateLanguages;
  
  Object.keys(source).filter((key) => key !== language).forEach((key) => {
    // console.log("finding for ", key)
    const pathContent = traverseSourceTree(source, [key, ...clonedSlug], 1) as SourceData;
    const transcriptLanguageSuffix = key === LanguageCode.en ? transcriptUrl : `${transcriptUrl}.${key}`;
    // console.log("path Content for", key, {pathContent})
    if ((pathContent?.data as string[])?.includes(transcriptLanguageSuffix)) {
      alternateLanguages.push(key);
    }
  });
  return alternateLanguages;
}

// adopting-bitcoin/2021/2021-11-16-gloria-zhao-transaction-relay-policy
export const traverseSourceTree = (current: SourceTree | SourceData | NestedSource<string>, path: string[], level: number = 0): SourceTree | SourceData | NestedSource<string> | string[] | null => {
  if (!current) return null;

  if (path.length === 0) return current;

  const currentPath = path.shift();

  if (currentPath === undefined) {
    return current;
  }

  if (level === 0) {
    return traverseSourceTree((current as SourceTree)[currentPath], path, level + 1);
  } else if (level === 1) {
    return traverseSourceTree((current as NestedSource<string>)[currentPath], path, level + 1);
  } else {
    return traverseSourceTree(((current as SourceData).data as NestedSource<string>)[currentPath], path, level + 1);
  }
};

export const arrayWithoutElementAtIndex = (arr: any[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
