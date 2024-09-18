"use client"
import React, { useEffect } from "react";
import SingleTranscriptContent from "./SingleTranscriptContent";
import { GroupedTopics, TopicsData } from "@/utils";
import { useInView } from "react-intersection-observer";

interface IGroupedTranscriptContent {
  topicsByAlphabet:  [string, TopicsData[]];
  setCurrentGroup: React.Dispatch<React.SetStateAction<string>>;
}

const GroupedTranscriptContent = ({
  topicsByAlphabet,
  setCurrentGroup,
}: IGroupedTranscriptContent) => {
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      setCurrentGroup(topicsByAlphabet[0]);
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      id={topicsByAlphabet[0].toLowerCase()}
      className="flex flex-col gap-7"
    >
      <h4 className="font-bold text-2xl">{topicsByAlphabet[0]}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {topicsByAlphabet[1].map((topics, i) => (
          <SingleTranscriptContent key={`${topics.slug}${i}`} {...topics} />
        ))}
      </div>
    </div>
  )
}

export default GroupedTranscriptContent