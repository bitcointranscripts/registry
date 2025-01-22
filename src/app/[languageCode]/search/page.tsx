import React from "react";

import { LanguageCodes } from "@/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { deriveAlternateLanguages, getLangCode } from "@/utils";
import SearchClient from "@/app/search/search-client";

export const dynamicParams = false;

const languageKeys = LanguageCodes;

export function generateStaticParams() {
  const searchLanguageKeys = languageKeys.map((lang) => {
    return { languageCode: lang };
  });
  return searchLanguageKeys;
}

export function generateMetadata({
  params,
}: {
  params: { languageCode: string };
}): Metadata {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
    languageCode,
    languages: languageKeys,
    suffix: "search",
  });

  return {
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
}

const SearchPage = ({ params }: { params: { languageCode: string } }) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  return (
    <SearchClient languageCode={languageCode} />
  );
};

export default SearchPage;
