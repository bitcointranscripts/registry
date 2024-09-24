"use client";

import React from "react";
import TranscriptContentPage from "../../../components/explore/TranscriptContentPage";
import allTopics from "../../../../public/topics-data.json";

const ExplorePage = () => {
  console.log(allTopics)
  return (
    <div className="flex flex-col pr-2 text-black">
        <TranscriptContentPage header="Topics" data={allTopics} description=""  type="alphabet" linkName="tags"/>
    </div>
  );
};

export default ExplorePage;
