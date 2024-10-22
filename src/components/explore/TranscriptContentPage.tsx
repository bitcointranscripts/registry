"use client";

import React, { FC, useState } from "react";
import BreadCrumbs from "../common/BreadCrumbs";
import GroupedTranscriptContent from "./GroupedTranscriptContent";
import AlphabetGrouping from "./AlphabetGrouping";
import { createSlug, DepreciatedCategories, groupDataByAlphabet, sortKeysAlphabetically } from "@/utils";
import MobileAlphabetGrouping from "./MobileAlphabetGrouping";
import ContentGrouping from "./ContentGrouping";

interface ITranscriptContentPage {
  header: string;
  description?: string;
  mobileDescription?: string;
  data: any /* A Json that changes could be topics, speakers, categories  */;
  type: "alphabet" | "words";
  linkName: DepreciatedCategories;
}

const TranscriptContentPage: FC<ITranscriptContentPage> = ({ header, data, description, mobileDescription, linkName, type }) => {
  const groupedData = type === "alphabet" ? groupDataByAlphabet(data) : sortKeysAlphabetically(data);
  const [currentGroup, setCurrentGroup] = useState<string>(type === "alphabet" ? "A" : createSlug(Object.keys(groupedData)[0]));

  return (
    <div className='flex items-start relative lg:gap-[50px]'>
      <div className='flex flex-col w-full gap-6 lg:gap-10 no-scrollbar'>
        <div className='block lg:hidden sticky top-[calc(var(--header-height))]'>
          {type == "alphabet" && <MobileAlphabetGrouping currentGroup={currentGroup} groupedData={groupedData} />}
          {type == "words" && <ContentGrouping groupedData={groupedData} currentGroup={currentGroup} screen='mobile' />}
        </div>
        <div className='flex flex-col border-b border-b-[#9B9B9B] pb-6 lg:pb-10  gap-6 '>
          <BreadCrumbs />
          <div className='flex flex-col gap-1  lg:gap-4'>
            <h3 className='text-xl  2xl:text-2xl font-medium'>{header}</h3>
            <p className='hidden lg:inline-block text-sm  lg:text-base 2xl:text-lg text-custom-black-custom-300'>{description}</p>
            <p className='inline-block lg:hidden text-sm lg:text-lg text-custom-black-custom-300'>{mobileDescription || description}</p>
          </div>
        </div>

        <div className='flex-col flex gap-10  pb-[calc(90vh-var(--header-height))]'>
          {groupedData &&
            type === "alphabet" &&
            Object.entries(groupedData).map((arg, i) => (
              <GroupedTranscriptContent
                setCurrentGroup={setCurrentGroup}
                key={`${arg[0]}${i}`}
                topicsByAlphabet={arg}
                linkName={linkName}
                type={type}
              />
            ))}

          {groupedData &&
            type == "words" &&
            Object.entries(groupedData).map((arg, i) => (
              <GroupedTranscriptContent
                setCurrentGroup={setCurrentGroup}
                key={`${arg[0]}${i}`}
                topicsByAlphabet={arg}
                linkName={linkName}
                type={type}
              />
            ))}
        </div>
      </div>

      <div className='hidden lg:flex sticky top-[calc(var(--header-height)+24px)] self-start flex-shrink-0 w-fit lg:justify-center '>
        {type === "alphabet" && <AlphabetGrouping groupedData={groupedData} currentGroup={currentGroup} />}
        {type == "words" && <ContentGrouping groupedData={groupedData} currentGroup={currentGroup} screen='desktop' />}
      </div>
    </div>
  );
};

export default TranscriptContentPage;
