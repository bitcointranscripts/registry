import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTypesData from "@/public/types-data.json";
import { createContentSlug, deriveAlternateLanguages, ExploreGroupedData, FieldCountItem } from "@/utils";
import { LanguageCode } from "@/config";
import { Metadata } from "next";

const languageKeys = Object.keys(allTypesData) as LanguageCode[];
const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: languageKeys,
  suffix: "types",
});

// console.log({languageKeys})

export const metadata: Metadata = {
  title: "Types",
  alternates: {
    canonical: "/types",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: LanguageCode.en,
  },
};

const TypesPage = () => {
  const languageCode = LanguageCode.en;
  const allTypes = allTypesData[languageCode].data as Record<string, FieldCountItem[]>;
  let reStructuredTypes: ExploreGroupedData[] = [];
  for (let key in allTypes) {
    reStructuredTypes.push({
      name: key,
      slug: createContentSlug(key),
      nested: allTypes[key],
    });
  }
  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="Types"
        data={reStructuredTypes}
        description="Sources tend to fall into discrete types, from podcasts to meetups. Find transcripts in your preferred format of communication."
        type="words"
        linkName="types"
        languageCode={languageCode}
      />
    </div>
  );
};

export default TypesPage;
