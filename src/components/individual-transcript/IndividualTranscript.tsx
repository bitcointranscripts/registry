"use client";
import React, { useState } from "react";
import { Transcript } from "contentlayer/generated";
import TranscriptMetadataComponent from "../common/TranscriptMetadataCard";
import ContentGrouping from "../explore/ContentGrouping";
import { ContentData, createContentSlug, extractHeadings, GroupedData } from "@/utils";
import Wrapper from "../layout/Wrapper";
import { twMerge } from "tailwind-merge";
import FooterComponent from "../layout/FooterComponent";
import BaseCrumbLists, { BaseCrumbType } from "../common/BaseCrumbLists";
import Tabs from "../common/Tabs";


type HeadingObject = Record<string, ContentData[]>;;

const IndividualTranscript = ({
  breadCrumbs,
  transcript,
}: {
  breadCrumbs: BaseCrumbType[];
  transcript: Transcript;
}) => {
  const [currentHeading, setCurrentHeading] = useState("");

  const allHeadings =  extractHeadings(transcript.body.raw).reduce<HeadingObject>((acc, key, index)=>{
    //  removing the # from the string
    let keyWithoutHash  = key.replace(/[#]+\s+/gi, "")
    acc[keyWithoutHash] = [{
      name: keyWithoutHash,
      slug: createContentSlug(key), 
    }]
     return acc;
  }, {})

  const staticRoutes = [
    { name: "Home", link: "/", isActive: false },
    { name: "Sources", link: "/sources", isActive: false },
  ];
  const finalRoutes = [...staticRoutes, ...breadCrumbs];
  return (
    <Wrapper className="relative flex flex-col !px-0 gap-6 lg:gap-7 2xl:gap-10 mx-auto h-[calc(100vh-var(--header-height))] w-full overflow-y-auto scroll-smooth">
      <div className="py-4 lg:pt-7 2xl:pt-10 px-4 lg:px-10 2xl:px-[60px]">
        <BaseCrumbLists crumbsArray={finalRoutes} />
      </div>

      <div className="flex gap-4 justify-between px-4 lg:px-10 2xl:px-[60px]">
        <div className=" w-full relative flex flex-col flex-1 ">
          <div className=" w-full">
            <TranscriptMetadataComponent
              title={transcript.title}
              date={transcript.date || ""}
              topics={transcript.tagsDetailed || []}
              speakers={transcript.speakers || []}
              transcriptBy={transcript.transcript_by || ""}
            />
          </div>

          <div>
            <div className="pt-4 md:pt-5 2xl:pt-6 pb-10">
              <Tabs
                markdown={transcript.body.raw}
                summary={transcript?.summary}
                extraInfo={transcript?.additional_resources}
                currentHeading={currentHeading}
                groupedHeading={allHeadings}
                setCurrentHeading={setCurrentHeading}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-full sticky lg:flex-auto top-6 max-w-[300px] 2xl:max-w-[465px] self-start">
          <ContentGrouping
            currentGroup={currentHeading}
            groupedData={allHeadings as unknown as GroupedData}
            className={twMerge(
              `!w-full rounded-xl max-h-[calc(90vh-var(--header-height))]`,
              Object.keys(allHeadings).length < 1 && "!invisible"
            )}
            screen="desktop"
          />
        </div>
      </div>
      <FooterComponent />
    </Wrapper>
  );
};

export default IndividualTranscript;
