import { FacetKeys } from "@/app/search/types";

export const LanguageCode = {
  en: "en",
  es: "es",
  pt: "pt",
  zh: "zh",
} as const;

export type LanguageCode = keyof typeof LanguageCode;

export const LanguageCodes = Object.values(LanguageCode);

export const OtherSupportedLanguages: LanguageCode[] = LanguageCodes.filter((code) => code !== LanguageCode.en);

export const LanguageConfig: Record<LanguageCode, {name: string, icon: string, url: string}> = {
  "en": {
    name: "English",
    icon: "🇺🇸",
    url: "/en",
  },
  "es": {
    name: "Español",
    icon: "🇪🇸",
    url: "/es",
  },
  "pt": {
    name: "Português",
    icon: "🇵🇹",
    url: "/pt",
  },
  "zh": {
    name: "中文",
    icon: "🇨🇳",
    url: "/zh",
  },
}

export const URLSearchParamsKeyword = {
  SEARCH: "search",
  PAGE: "page",
  SIZE: "size",
  FILTER: "filter",
  SORT: "sort",
} as const;

export const defaultParam = {
  size: 10,
};

export const TruncateLengthInChar = 300;
export const TruncateLinkInChar = 50;

export const aggregatorSize = 100;

export const setup = {
  facetFields: ["authors", "transcript_source", "tags"] as FacetKeys[],
  sortFields: ["created_at"]
}

export const FacelLabelMapping: Record<FacetKeys, string> = {
  "authors": "speakers",
  "tags": "topics",
  "transcript_source": "sources",
  "domain": "domains"
};

export const FIELDS_TO_SEARCH = [
  "title",
  "body",
  "authors",
  "tags",
  "transcript_source",
];

export const FIELDS_TO_EXCLUDE = [
 "summary_vector_embeddings", "body_formatted",
]