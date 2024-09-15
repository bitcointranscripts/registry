import React, { useEffect } from "react";
import SingleTranscriptContent from "./SingleTranscriptContent";
import { GroupedTopics } from "@/utils";
import { useInView } from "react-intersection-observer";

interface IGroupedTranscriptContent {
  topicsByAlphabet: GroupedTopics;
  setCurrentGroup: React.Dispatch<React.SetStateAction<string>>;
}

const GroupedTranscriptContent = ({
  topicsByAlphabet,
  setCurrentGroup,
}: IGroupedTranscriptContent) => {
  const { ref, inView, entry } = useInView();


  useEffect(() => {
    if (inView) {
      setCurrentGroup(topicsByAlphabet.letter);
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      id={topicsByAlphabet.letter.toLowerCase()}
      className="flex flex-col gap-7"
    >
      <h4 className="font-bold text-2xl">{topicsByAlphabet.letter}</h4>
      <div className="grid grid-cols-2 gap-2.5">
        {topicsByAlphabet.titles.map((topics, i) => (
          <SingleTranscriptContent key={`${topics.slug}${i}`} {...topics} />
        ))}
      </div>
    </div>
  )
}

export default GroupedTranscriptContent