import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allCategoriesTopic from "@/public/topics-by-category-counts.json";
import { createContentSlug, deriveAlternateLanguages, ExploreGroupedData, getLangCode } from "@/utils";
import { LanguageCode } from "@/config";
import { notFound } from "next/navigation";
import { TopicsCategoryCountByLanguage } from "@/types";
import { Metadata } from "next";

export const dynamicParams = false;

export function generateStaticParams() {
  const topicLanguageSlugs = Object.keys(allCategoriesTopic).map(lang => {
    return { languageCode: lang };
  } );
  return topicLanguageSlugs;
}

export function generateMetadata({ params }: { params: { languageCode: string } }): Metadata {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const languageKeys = Object.keys(allCategoriesTopic) as LanguageCode[];

  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({languageCode, languages: languageKeys, suffix: "categories"});
  console.dir({alternateLanguages, metadataLanguages}, {depth: 10})
  return {
    title: "Categories",
    alternates: {
      canonical: "/categories",
      languages: metadataLanguages // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: languageCode
    }
  };
}

const CategoriesPage = ({params}: {params: { languageCode: LanguageCode}}) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }
  
  const categoriesTopic = (allCategoriesTopic as TopicsCategoryCountByLanguage)[languageCode].data;
  let reStructuredCategories: ExploreGroupedData[] = [];
  for (let key in categoriesTopic) {
    reStructuredCategories.push({
      name: key,
      slug: createContentSlug(key),
      nested: categoriesTopic[key],
    });
  }
  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="Categories"
        data={reStructuredCategories}
        description="Explore the main areas of focus within the Bitcoin technical ecosystem."
        type="words"
        linkName="tags"
      />
    </div>
  );
};

export default CategoriesPage;
