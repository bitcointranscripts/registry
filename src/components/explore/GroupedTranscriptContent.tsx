"use client";
import React, { useEffect } from "react";
import SingleTranscriptContent from "./SingleTranscriptContent";
import { DepreciatedCategories, GroupedTopics, TopicsData } from "@/utils";
import { useInView } from "react-intersection-observer";
import { root } from "postcss";

interface IGroupedTranscriptContent {
  topicsByAlphabet: [string, TopicsData[]];
  setCurrentGroup: React.Dispatch<React.SetStateAction<string>>;
  linkName: DepreciatedCategories
}

const GroupedTranscriptContent = ({
  topicsByAlphabet,
  setCurrentGroup,
  linkName
}: IGroupedTranscriptContent) => {
  const handleAxisChange = (
    inView: boolean,
    entry: IntersectionObserverEntry
  ) => {

    if (inView) {
      setCurrentGroup(topicsByAlphabet[0]);
    }
  };
  const { ref } = useInView({
    rootMargin:"-20% 0% -80% 0%",
    onChange: handleAxisChange,
  });

  return (
    <div
      ref={ref}
      id={topicsByAlphabet[0].toLowerCase()}
      className="flex flex-col gap-7"
    >
      <h4 className="font-bold text-2xl">{topicsByAlphabet[0]}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {topicsByAlphabet[1].map((topics, i) => (
          <SingleTranscriptContent key={`${topics.slug}${i}`} {...topics} linkName={linkName} />
        ))}
      </div>
    </div>
  )
}

export default GroupedTranscriptContent