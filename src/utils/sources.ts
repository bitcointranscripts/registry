import { BaseCrumbType } from "@/components/common/BaseCrumbLists";
import { LanguageCode } from "@/config";
import { NestedSource, SourceData, SourceTree } from "@/types";

type GetSourceBreadcrumbsFromSlugProps = {
  slug: string[];
  list?: BaseCrumbType[];
  current: SourceTree | NestedSource<string> | string[];
  language: string;
  idx?: number;
  link?: string;
  activeRoute?: string;
};

// derives the breadcrumbs data for a given source slug
export function getSourceBreadcrumbsFromSlug({
  slug,
  list = [],
  current,
  language = "en",
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
    pathContent = (current as SourceTree)[path][language as LanguageCode];
  } else {
    pathContent = (current as NestedSource<string>)[path];
  }

  const title = pathContent.metadata.title;
  const data = pathContent.data;

  if (!title || !data) {
    return list;
  }

  const pathWithLanguage = language !== "en" ? `${language}/${path}` : path;

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
