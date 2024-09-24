"use client"

import React from "react";
import TranscriptContentPage from "../../../components/explore/TranscriptContentPage";
import allSpeakers from "../../../../public/speaker-data.json";

const ExplorePage = () => {

  return (
    <div className="flex flex-col pr-2 text-black">
        <TranscriptContentPage header="Speakers" data={allSpeakers} description="Discover insights from key figures of the Bitcoin community."  type="alphabet" linkName="speakers"/>
    </div>
  );
};

export default ExplorePage;
