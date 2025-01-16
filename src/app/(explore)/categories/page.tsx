import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allCategoriesTopic from "@/public/topics-by-category-counts.json";
import { createContentSlug, ExploreGroupedData, FieldCountItem } from "@/utils";

const CategoriesPage = () => {
  const categoriesTopic = allCategoriesTopic as Record<string, FieldCountItem[]>;
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
