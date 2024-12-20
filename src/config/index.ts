import { FacetKeys } from "@/app/search/types";

export const LanguageCodes = ["zh", "es", "pt"]

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
  sortFields: ["indexed_at"]
}

export const FacelLabelMapping: Record<FacetKeys, string> = {
  "authors": "Speakers",
  "tags": "Topics",
  "transcript_source": "Sources",
  "domain": "Domains"
};

export const FIELDS_TO_SEARCH = [
  "title",
  "body",
  "authors",
  "tags",
  "summary",
  "transcript_source",
];

export const FIELDS_TO_EXCLUDE = [
 "summary", "summary_vector_embeddings", "body_formatted"
]