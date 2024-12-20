const AUTHOR = "authors" as const;
const DOMAIN = "domain" as const;
const TAGS = "tags" as const;
const SOURCE = "transcript_source" as const;

export type FacetKeys = typeof AUTHOR | typeof DOMAIN | typeof TAGS | typeof SOURCE;

export type Facet = {
  field: FacetKeys;
  value: string;
};

const bodyType = {
  markdown: "markdown",
  raw: "raw",
  html: "html",
  "combined-summary": "combined-summary",
} as const;

export type SortOption = "asc" | "desc";

export type SearchQuery = {
  queryString: string;
  size: number;
  page: number;
  filterFields: Facet[];
  sortFields: any[];
};

export type EsSearchResult = {
  _id: string;
  _index: string;
  _source: {
    authors: string[];
    body: string;
    body_type: BodyType;
    created_at?: Date;
    domain: string;
    id: string;
    indexed_at: Date;
    title: string;
    url: string;
    // body_formatted?: string;
    categories: string[];
    media?: string;
    tags: string[];
    needs_review: boolean;
    transcript_by?: string;
    transcript_source: string;
    // summary?: string;
    // thread_url?: string;
    // type?: "question" | "reply" | "original_post" | "newsletter";
  }
};

export type BodyType = (typeof bodyType)[keyof typeof bodyType];

type SearchResponse<TData, TAggregates> = {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: EsSearchResult[];
  };
  aggregations: Record<FacetKeys, {
    buckets: {key: string, doc_count: number}[]
  }>;
};

export type EsSearchResponse = SearchResponse<
  unknown,
  Record<string, any>
>;

export interface Source {
  domain: string;
  lastScraped: string;
  documentCount: number;
}

export type EsSourcesResponse = Source[];
