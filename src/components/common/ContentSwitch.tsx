"use client";

import { Resources } from "contentlayer/generated";
import React, { SetStateAction, useState } from "react";
import TranscriptTabContent from "../individual-transcript/TranscriptTabContent";
import ContentGrouping from "../explore/ContentGrouping";
import { TopicsData } from "@/utils";

const ContentSwitch = ({
  summary,
  markdown,
  extraInfo,
  currentHeading,
  groupedHeading,
  setCurrentHeading
}: {
  summary?: string;
  markdown: string;
  extraInfo?: Resources[];
  currentHeading?: string;
  groupedHeading?: Record<string, TopicsData[]>;
  setCurrentHeading?: React.Dispatch<SetStateAction<string>>
}) => {
  const [openSection, setOpenSection] = useState({
    transcript: true,
    summary: false,
    extraInfo: false,
  });

  return (
    <div className="flex flex-col relative">
      <div className="sticky bg-white z-10 top-0 lg:top-0  md:pt-6 h-full flex gap-4 md:gap-10 xl:gap-16 justify-start items-center border-b border-b-gray-custom-1200">
        <SwitchItem
          title="Transcript"
          isOpen={openSection.transcript}
          onClick={() =>
            setOpenSection((prev) => ({
              ...prev,
              transcript: true,
              summary: false,
              extraInfo: false,
            }))
          }
        />
        {summary && (
          <SwitchItem
            title="Summary"
            isOpen={openSection.summary}
            onClick={() =>
              setOpenSection((prev) => ({
                ...prev,
                summary: true,
                transcript: false,
                extraInfo: false,
              }))
            }
          />
        )}

        {extraInfo && (
          <SwitchItem
            title="Extra Info"
            isOpen={openSection.extraInfo}
            onClick={() =>
              setOpenSection((prev) => ({
                ...prev,
                extraInfo: true,
                transcript: false,
                summary: false,
              }))
            }
          />
        )}
      </div>
      
      {Object.keys({...groupedHeading}).length > 0 &&
      <div className="block w-full pt-4 lg:hidden sticky top-[20px] md:top-[65px] z-[5]">
        <ContentGrouping
          currentGroup={currentHeading || ""}
          groupedData={groupedHeading || []}
          screen="mobile"
        />
      </div> }

      <div className="relative h-full lg:max-w-[90%]">
        {openSection.transcript ? (
          <div className="relative">
            <div className="pt-4  selection:bg-[#B4D5FF]">
              <TranscriptTabContent markdown={markdown}  setCurrentHeading={setCurrentHeading} />
            </div>
          </div>
        ) : null}
        {openSection.summary ? (
          <section className="pt-4">
            <p>{summary}</p>
          </section>
        ) : null}
        {openSection.extraInfo ? (
          <section className="flex flex-col pt-4">
            {extraInfo?.map((info) => (
              <p className="text-base 2xl:text-lg font-medium leading-8">
                {" "}
                <span>{info.title}: </span>
                <a
                  target="_blank"
                  href={info.url}
                  className="text-blue-custom-200 font-medium hover:underline visited:bg-purple-600"
                >
                  {info.url}
                </a>
              </p>
            ))}
          </section>
        ) : null}
      </div>
    </div>
  );
};

const SwitchItem = ({
  title,
  isOpen,
  onClick,
}: {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-[33%] flex items-start justify-center h-[31px] md:h-12 xl:h-14 2xl:h-[60px]"
    >
      <section className="flex flex-col h-full items-center justify-between relative w-full">
        <p
          className={`text-sm md:text-base xl:text-lg 2xl:text-xl font-normal ${
            isOpen ? "text-orange-custom-100" : "text-custom-black-custom-400"
          }`}
        >
          {title}
        </p>
        {isOpen ? (
          <div className="h-1 bg-orange-custom-100 w-full absolute bottom-0"></div>
        ) : null}
      </section>
    </button>
  );
};

export default ContentSwitch;
