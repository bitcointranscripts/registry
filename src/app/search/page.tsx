import React from "react";
import { LanguageCode, OtherSupportedLanguages } from "@/config";
import { deriveAlternateLanguages } from "@/utils";
import { Metadata } from "next";
import SearchClient from "./search-client";

const languageKeys = OtherSupportedLanguages

const languageCode = LanguageCode.en;

const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: languageKeys,
  suffix: "search",
});

export const metadata: Metadata = {
  title: "Search",
  alternates: {
    canonical: "/search",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: languageCode,
  },
};

const SearchPage = () => {
  return (
    <SearchClient languageCode={languageCode} />
  )
};

export default SearchPage;
