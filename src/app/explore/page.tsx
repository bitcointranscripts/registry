"use client";

import React from "react";
import TranscriptContentPage from "../../components/explore/TranscriptContentPage";


const ExplorePage = () => {
  console.log(allTopics)
  return (
    <div className="min-h-screen flex p-4 lg:p-6 flex-col text-black">
        <TranscriptContentPage />
    </div>
  );
};

export default ExplorePage;
