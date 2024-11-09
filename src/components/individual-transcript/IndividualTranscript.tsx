"use client";
import React, { useState } from "react";
import { Transcript } from "contentlayer/generated";
import BreadCrumbs from "../common/BreadCrumbs";
import TranscriptMetadataComponent from "../common/TranscriptMetadataCard";
import ContentSwitch from "../common/ContentSwitch";
import AlphabetGrouping from "../explore/AlphabetGrouping";
import ContentGrouping from "../explore/ContentGrouping";
import { createSlug, extractListOfHeadings } from "@/utils";
import Wrapper from "../layout/Wrapper";
import { twMerge } from "tailwind-merge";

const IndividualTranscript = ({ transcript }: { transcript: Transcript }) => {
  const [currentHeading, setCurrentHeading] = useState("");
  const allHeadings = extractListOfHeadings(transcript.body.raw).map(
    (heading) => ({
      name: heading.replace(/[#]+\s+/gi, ""),
      slug: createSlug(heading.replace(/[#]+\s+/gi, "")),
      count: 0,
    })
  );
  const groupedHeading = allHeadings.reduce(
    (heading, headingNow) => ({ ...heading, [headingNow.name]: headingNow }),
    {}
  );

  return (
    <Wrapper className="relative py-10 flex flex-col gap-6 lg:gap-7 2xl:gap-10 mx-auto w-full">
      <BreadCrumbs  type="transcript"/>
      <div className="flex gap-4  justify-between w-full ">
        <div className=" w-full relative flex flex-col">
          <div className=" w-full">
            <TranscriptMetadataComponent
              title={transcript.title}
              date={transcript.date || ""}
              topics={transcript.tags || []}
              speakers={transcript.speakers || []}
              transcriptBy={transcript.transcript_by || ""}
            />
          </div>
          
          <div>
            <div className="pt-4 md:pt-5 2xl:pt-6">
              <ContentSwitch
                markdown={transcript.body.raw}
                summary={transcript?.summary}
                extraInfo={transcript?.additional_resources}
                currentHeading={currentHeading}
                groupedHeading={groupedHeading}
                setCurrentHeading={setCurrentHeading}
              />
            </div>
          </div>
        </div>

<div>
        <div className="hidden lg:flex w-full sticky lg:flex-auto top-[110px] max-w-[350px] 2xl:max-w-[465px]"> 
            <ContentGrouping
              currentGroup={currentHeading}
              groupedData={groupedHeading}
              className={twMerge(`!w-full rounded-xl max-h-[calc(90vh-var(--header-height))]`,
                Object.keys(groupedHeading).length < 1 && "!invisible"
              )}
              screen="desktop"
            /> 
          </div>
          </div>  
      </div>
    </Wrapper>
  );
};

export default IndividualTranscript;
