"use client"

import React from "react";
import TranscriptContentPage from "../../../components/explore/TranscriptContentPage";
import allCategoriesTopic from "../../../../public/tag-data.json";

const ExplorePage = () => {

  return (
    <div className="flex flex-col pr-2 text-black">
        <TranscriptContentPage header="Categories" data={allCategoriesTopic} description="Explore the main areas of focus within the Bitcoin technical ecosystem."  type="words" linkName="tags"/>
    </div>
  );
};

export default ExplorePage;
