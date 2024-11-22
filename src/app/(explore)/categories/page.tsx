import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allCategoriesTopic from "@/public/topics-by-category-counts.json";

const CategoriesPage = () => {

  return (
    <div className="flex flex-col text-black">
        <TranscriptContentPage header="Categories" data={allCategoriesTopic} description="Explore the main areas of focus within the Bitcoin technical ecosystem."  type="words" linkName="tags"/>
    </div>
  );
};

export default CategoriesPage;
