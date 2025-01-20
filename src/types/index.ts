import type { LanguageCode } from "@/config";
import { FieldCountItem } from "@/utils";

// e.g { "data": { "another_nesting": {...} }, "metadata": {...} } } OR { "data": ["string", ...], "metadata": {...} } }
export type SourceData = {
  data: NestedSource<string> | string[];
  metadata: {
    title: string;
  };
}

// e.g { "en": { "data": {...}, "metadata": {...} } } OR { "2021": { "data": {...}, "metadata": {...} } }
export type NestedSource<T extends string> = Record<T, SourceData>;

// e.g { "adopting-bitcoin": { "en": {...} } }
export type SourceTree = Record<string, NestedSource<string>>

export type TraversableSource = SourceTree | NestedSource<string> | string[];

export type LanguageSwitchConfig = {
  pageAvailableLanguages: { language: LanguageCode; url: string }[];
  websiteLanguages: { language: LanguageCode; url: string }[];
  currentLanguage: LanguageCode;
};

export interface Topic {
  title: string;
  slug: string;
  optech_url: string;
  categories: string[];
  aliases?: string[];
  excerpt: string;
}

export interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

export interface ContentTree<T> {
  [key: string]: ContentTree<T> | T[];
}

// The full processed topic we use internally
export interface ProcessedTopic {
  name: string; // Display name (from topic.title or original tag)
  slug: string; // Slugified identifier
  count: number; // Number of occurrences
  categories: string[]; // List of categories it belongs to
}

// note: metadata field is not used for anything at the moment. It is provided in case of future data we might need
export type ProcessedFieldByLanguage<D extends any, M extends any> = Record<LanguageCode, {data: D, metadata: M}>

export type TopicsCountByLanguage = ProcessedFieldByLanguage<FieldCountItem[], {}>;

export type TopicsCategoryCountByLanguage = ProcessedFieldByLanguage<Record<string, FieldCountItem[]>, {}>;
