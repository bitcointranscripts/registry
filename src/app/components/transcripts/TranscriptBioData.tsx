import React, { useState } from "react";
import PencilEdit from "../svgs/EyeIcon";
import EyeIcon from "../svgs/EyeIcon";
import EyeLidsIcon from "../svgs/EyeLidsIcon";
import {
  BookmarkIcon,
  CalendarIcon,
  MicIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";

interface ITranscriptBioData {
  title: string;
  date: string | Date;
  topics: string[];
  speakers: string[] | null;
  transcriptBy: string | string[];
}
const TranscriptBioData = ({
  title,
  speakers,
  topics,
  transcriptBy,
}: ITranscriptBioData) => {
  const [showDetail, setShowDetail] = useState(true);
  const handleShowDetail = () => {
    setShowDetail((prev) => !prev);
  };
  return (
    <div className="border flex text-black flex-col rounded-2xl p-6 gap-4 w-full border-[#CCCCCC]">
      <div className=" flex flex-col md:flex-row flex-wrap gap-4 justify-between ">
        <h4 className="text-orange-custom-100 text-xl font-bold lg:text-[2rem]">
          {title}
        </h4>
        <button
          onClick={handleShowDetail}
          className="text-black text-sm lg:text-base gap-1 p  py-2 px-5 flex items-center border max-w-[max-content] rounded-lg border-gray-custom-1100"
        >
          {showDetail ? (
            <>
              <EyeLidsIcon className="w-5" />
              <span className=" font-medium"> Hide Details </span>
            </>
          ) : (
            <>
              <EyeIcon className="w-5" />
              <span className="font-medium"> Show Details </span>
            </>
          )}
        </button>
      </div>
      {/* Depends on the Show and Hide Button */}
      {showDetail && (
        <div className="grid grid-cols-1  md:grid-cols-2 gap-2 md:gap-16">
          <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
            <div className="flex items-center gap-1">
              <CalendarIcon width={"19px"} color="#141B34" />
              <p className=" text-base md:text-lg font-semibold">Date</p>
            </div>
            <div className="pl-5">
              <p className=" text-xs md:text-lg md:font-medium">
                7 March, 2024
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
            <div className="flex items-center gap-1">
              <BookmarkIcon width={"19px"} color="#141B34" />
              <p className="text-base md:text-lg font-semibold">Topic</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics &&
                topics.map((topic) => (
                  <p
                    key={topic}
                    className=" max-content py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]"
                  >
                    {topic}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
            <div className="flex items-center gap-1">
              <MicIcon width={"19px"} color="#141B34" />
              <p className="text-base md:text-lg font-semibold">Speakers</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {speakers &&
                speakers.map((speaker) => (
                  <p
                    key={speaker}
                    className=" max-content py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]"
                  >
                    {speaker}
                  </p>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
            <div className="flex items-center gap-1">
              <PencilEdit />
              <p className="text-base md:text-lg font-semibold">
                Transcript by
              </p>
            </div>
            <div className="pl-5">
              <p className="text-xs md:text-lg md:font-medium">
                {transcriptBy}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptBioData;
