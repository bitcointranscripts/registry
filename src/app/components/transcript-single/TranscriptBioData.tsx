import { BookmarkIcon, CalendarIcon, DateIcon, MicIcon } from "bdp-ui/icons";
import React, { useState } from "react";
import PencilEdit from "../svgs/Pencil";

interface ITranscriptBioData {
  title: string;
  date: string | Date;
  topics: string[];
  speakers: string[] | null;
  transcriptBy: string | string[];
}
const TranscriptBioData = ({ title, speakers, topics, transcriptBy }: ITranscriptBioData) => {
  const [showDetail, setShowDetail] = useState(true);
  return (
    <div className="border flex text-black flex-col rounded-2xl p-6 w-full border-[#CCCCCC]">
      <div className="flex justify-between ">
        <h4 className="text-orange-custom-100 font-bold text-[2rem]">
          {title}
        </h4>
        <button className="text-black">Hide Details</button>
      </div>
      {/* Depends on the Show and Hide Button */}
      <div className="grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
          <div className="flex gap-1">
            <CalendarIcon width={"19px"} color="#141B34" />
            <p className="text-lg font-semibold">Date</p>
          </div>
          <div className="pl-5">
            <p className="text-lg font-medium">7 March, 2024</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
          <div className="flex gap-1">
            <BookmarkIcon width={"19px"} color="#141B34" />
            <p className="text-lg font-semibold">Topic</p>
          </div>
          <div className="flex flex-wrap gap-2">
          {topics &&
              topics.map((topic) => (
                <p key={topic} className=" max-content py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]">
                  {topic}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
          <div className="flex gap-1">
            <MicIcon width={"19px"} color="#141B34" />
            <p className="text-lg font-semibold">Speakers</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {speakers &&
              speakers.map((speaker) => (
                <p key={speaker} className=" max-content py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]">
                  {speaker}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-b py-3  border-dashed border-[#BEBEBE]">
          <div className="flex gap-1">
            <PencilEdit />
            <p className="text-lg font-semibold">Transcript by</p>
          </div>
          <div className="pl-5">
            <p>{transcriptBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptBioData;
