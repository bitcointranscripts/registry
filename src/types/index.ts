import type { LanguageCode } from "@/config";

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
