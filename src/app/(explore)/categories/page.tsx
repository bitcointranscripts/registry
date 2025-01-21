import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allCategoriesTopic from "@/public/topics-by-category-counts.json";
import {
  createContentSlug,
  deriveAlternateLanguages,
  ExploreGroupedData,
} from "@/utils";
import { LanguageCode } from "@/config";
import { TopicsCategoryCountByLanguage } from "@/types";
import { Metadata } from "next";

const languageKeys = Object.keys(allCategoriesTopic) as LanguageCode[];
const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: languageKeys,
  suffix: "categories",
});

export const metadata: Metadata = {
  title: "Categories",
  alternates: {
    canonical: "/categories",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: LanguageCode.en,
  },
};

const CategoriesPage = () => {
  const languageCode = LanguageCode.en;
  const categoriesTopic = (allCategoriesTopic as TopicsCategoryCountByLanguage)[
    languageCode
  ].data;
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
