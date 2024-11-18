"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookmarkIcon,
  CalendarIcon,
  MicIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";
import Link from "next/link";
import { createSlug } from "@/utils";
import AiGeneratedIcon from "../svgs/AIGeneratedIcon";
import { format, isDate } from "date-fns";

interface ITranscriptMetadataComponent {
  title: string;
  date: string | Date;
  topics: string[];
  speakers: string[] | null;
  transcriptBy: string | string[];
}

const TranscriptMetadataComponent = ({
  title,
  speakers,
  topics,
  date,
  transcriptBy,
}: ITranscriptMetadataComponent) => {
  const [showDetail, setShowDetail] = useState(true);
  const isAiGenerated = transcriptBy.includes("needs-review") ? true : false;
  const handleShowDetail = () => {
    setShowDetail((prev) => !prev);
  };

  const convertedDate  = date ? new Date(date) : false
 
  const formattedDate =   isDate(convertedDate) ? format(convertedDate, "d MMMM, yyyy") : "";

  return (
    <div className="border flex text-black flex-col rounded-2xl p-4 md:p-5 2xl:p-6 gap-4 w-full border-gray-custom-1200">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between ">
        <h4 className="text-orange-custom-100 text-xl font-bold md:text-2xl 2xl:text-[2rem]">
          {title}
        </h4>
        <button
          onClick={handleShowDetail}
          className="text-black text-sm lg:text-base gap-1 py-1.5 2xl:py-2 px-5 flex items-center border  w-[149px] md:w-[154px] rounded-lg border-gray-custom-1100 whitespace-nowrap"
        >
          {showDetail ? (
            <>
              <Image
                src="/svgs/eye-close-icon.svg"
                alt="eye close icon"
                width={24}
                height={24}
                className="w-5"
              />
              <span className="font-medium text-sm 2xl:text-base">
                Hide Details{" "}
              </span>
            </>
          ) : (
            <>
              <Image
                src="/svgs/eye-open-icon.svg"
                alt="eye open icon"
                width={24}
                height={24}
                className="w-5"
              />
              <span className="font-medium">Show Details</span>
            </>
          )}
        </button>
      </div>
      {/* Depends on the Show and Hide Button */}
      {showDetail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 2xl:gap-6">
          <MetadataBlock
            header={
              <>
                <CalendarIcon width={"19px"} color="#141B34" />
                <p className="text-base lg:text-lg font-semibold">Date</p>
              </>
            }
            footer={
              <div className="pl-5">
                <p className="text-xs md:text-sm lg:text-base 2xl:text-lg md:font-medium">
                  {formattedDate}
                </p>
              </div>
            }
          />
          {/* render only 3 tags*/}
          <MetadataBlock
            header={
              <>
                <BookmarkIcon width={"19px"} color="#000000" />
                <p className="text-base lg:text-lg font-semibold">Topics</p>
              </>
            }
            footer={
              <div className="flex flex-wrap gap-2">
                {topics &&
                  topics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/tags/${createSlug(topic)}`}
                      className="max-content py-1 px-4 rounded-[5px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] text-xs md:text-sm 2xl:text-base max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]"
                    >
                      {topic}
                    </Link>
                  ))}
              </div>
            }
          />

          <MetadataBlock
            header={
              <>
                <MicIcon width={"19px"} color="#000000" />
                <p className="text-base lg:text-lg font-semibold">Speakers</p>
              </>
            }
            footer={
              <div className="flex flex-wrap gap-2">
                {speakers &&
                  speakers.map((speaker) => (
                    <Link
                      href={`/speakers/${createSlug(speaker)}`}
                      key={speaker}
                      className=" max-content py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] text-xs md:text-sm 2xl:text-base max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]"
                    >
                      {speaker}
                    </Link>
                  ))}
              </div>
            }
          />

          <MetadataBlock
            header={
              <>
                <Image
                  src="/svgs/pencil-icon.svg"
                  alt="pencil icon"
                  width={24}
                  height={24}
                  className="w-5"
                />
                <p className="text-base lg:text-lg font-semibold">
                  Transcript by
                </p>
              </>
            }
            footer={
              <div className="pl-5">
                {isAiGenerated ? (
                  <>
                    <a className="text-blue-custom-100 no-underline border-b border-blue-custom-100 max-w-[max-content] text-sm 2xl:text-base flex gap-1 items-start cursor-pointer">
                    <AiGeneratedIcon className="-mt-0.5" />
                      <span>
                        AI Generated (Review for sats)
                      </span>
                      
                    </a>{" "}
                  </>
                ) : (
                  <p className="text-xs md:text-sm lg:text-sm 2xl:text-base md:font-medium">
                    {transcriptBy}
                  </p>
                )}
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

const MetadataBlock = ({
  header,
  footer,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 border-b pb-3  border-dashed border-gray-custom-1600">
      <div className="flex items-center gap-1">{header}</div>
      <div>{footer}</div>
    </div>
  );
};

export default TranscriptMetadataComponent;
