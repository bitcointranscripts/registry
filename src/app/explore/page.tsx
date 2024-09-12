"use client";

import React from "react";
import BreadCrumbs from "../components/common/BreadCrumbs";
import GroupedTranscriptContent from "../components/explore/GroupedTranscriptContent";
import AlphabetGrouping from "../components/explore/AlphabetGrouping";
import allTopics from "../../../public/tag-data.json"

const ExplorePage = () => {
  console.log(allTopics)
  return (
    <div className="min-h-screen flex p-6 flex-col text-black">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 border-b border-b-[#9B9B9B] pb-10">
          <BreadCrumbs
            rootLink="/explore"
            links={[
              { name: "Transcripts", link: "/explore" },
              { name: "Topics", link: "/explore/topics" },
            ]}
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-medium">Topics</h3>
            <p className="text-lg text-custom-black-custom-300">
              Bitcoin is made up of an endless amount of topics, and there’s no
              shortage of rabbit holes to go down.
            </p>
          </div>
        </div>

        <div className="flex-col flex gap-10">
              <GroupedTranscriptContent />
        </div>

        <AlphabetGrouping />
      </div>
    </div>
  );
};

export default ExplorePage;
