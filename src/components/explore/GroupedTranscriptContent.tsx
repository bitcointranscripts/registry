"use client";
import React from "react";
import { ExploreGroupedData } from "@/utils";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

interface IGroupedTranscriptContent {
  dataByHeading: ExploreGroupedData;
  setCurrentGroup: React.Dispatch<React.SetStateAction<string>>;
  children: (topic: ExploreGroupedData) => React.ReactNode; // Assuming each topic is any type, adjust as needed
}

const GroupedTranscriptContent = ({
  dataByHeading,
  setCurrentGroup,
  children
}: IGroupedTranscriptContent) => {
  const handleAxisChange = (inView: boolean) => {
    if (inView) {
      setCurrentGroup(dataByHeading.slug);
    }
  };
  const { ref } = useInView({
    rootMargin: "-20% 0% -80% 0%",
    onChange: handleAxisChange,
  });

  return (
    <div
      ref={ref}
      id={dataByHeading.slug}
      className={twMerge(
        "flex flex-col gap-7",
        dataByHeading?.nested?.length === 0 && "hidden",
      )}
    >
      <h4 className="font-bold text-2xl capitalize">{dataByHeading.name}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {dataByHeading.nested &&
          dataByHeading.nested.map((topic, i) => (
            children(topic)
          ))}
      </div>
    </div>
  );
};

export default GroupedTranscriptContent;
