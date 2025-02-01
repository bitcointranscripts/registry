import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTypesData from "@/public/types-data.json";
import { createContentSlug, deriveAlternateLanguages, ExploreGroupedData, FieldCountItem, getLangCode } from "@/utils";
import { LanguageCode } from "@/config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProcessedFieldByLanguage } from "@/types";

export const dynamicParams = false;

export function generateStaticParams() {
  const topicLanguageSlugs = Object.keys(allTypesData).map(lang => {
    return { languageCode: lang };
  } );
  return topicLanguageSlugs;
}

export function generateMetadata({ params }: { params: { languageCode: string } }): Metadata {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const languageKeys = Object.keys(allTypesData) as LanguageCode[];

  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({languageCode, languages: languageKeys, suffix: "types"});

  return {
    title: "Types",
    alternates: {
      canonical: "/types",
      languages: metadataLanguages // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: languageCode
    }
  };
}

const TypesPage = ({params}: {params: { languageCode: LanguageCode}}) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }
  const data = allTypesData as unknown as ProcessedFieldByLanguage<Record<string, FieldCountItem[]>, {}>;
  
  const allTypes = data[languageCode].data;
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
        header="types"
        data={reStructuredTypes}
        type="words"
        linkName="sources"
        languageCode={languageCode}
      />
    </div>
  );
};

export default TypesPage;
