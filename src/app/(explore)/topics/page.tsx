"use client";

import React from "react";
import TranscriptContentPage from "../../../components/explore/TranscriptContentPage";


const ExplorePage = () => {
  console.log(allTopics)
  return (
    <div className="flex flex-col pr-2 text-black">
        <TranscriptContentPage />
    </div>
  );
};

export default ExplorePage;
