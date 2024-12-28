"use client";
import React from "react";
import SingleTranscriptContent from "./SingleTranscriptContent";
import { createSlug, TopicsData } from "@/utils";
import { useInView } from "react-intersection-observer";

interface IGroupedTranscriptContent {
  topicsByAlphabet: [string, TopicsData[]];
  setCurrentGroup: React.Dispatch<React.SetStateAction<string>>;
  linkName: string;
  type: "alphabet" | "words";
}

const GroupedTranscriptContent = ({
  topicsByAlphabet,
  setCurrentGroup,
  linkName,
  type,
}: IGroupedTranscriptContent) => {
  const handleAxisChange = (
    inView: boolean,
    entry: IntersectionObserverEntry,
  ) => {
    if (inView) {
      setCurrentGroup(topicsByAlphabet[0]);
    }
  };
  const { ref } = useInView({
    rootMargin: "-20% 0% -80% 0%",
    onChange: handleAxisChange,
  });

  return type === "alphabet" ? (
    <div
      ref={ref}
      id={topicsByAlphabet[0].toLowerCase()}
      className="flex flex-col gap-7 "
    >
      <h4 className="font-bold text-2xl capitalize">{topicsByAlphabet[0]}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {topicsByAlphabet[1].map((topics, i) => (
          <SingleTranscriptContent
            key={`${topics.slug}${i}`}
            {...topics}
            linkName={linkName}
          />
        ))}
      </div>
    </div>
  ) : (
    <div
      ref={ref}
      id={createSlug(topicsByAlphabet[0])}
      className="flex flex-col gap-7"
    >
      <h4 className="font-bold text-2xl capitalize">{topicsByAlphabet[0]}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {topicsByAlphabet[1] &&
          topicsByAlphabet[1].map((data, i) => (
            <SingleTranscriptContent
              key={`${data.slug}${i}`}
              {...data}
              name={data.name}
              linkName={linkName}
            />
          ))}
      </div>
    </div>
  );
};

export default GroupedTranscriptContent;
