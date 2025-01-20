"use client";
import React from "react";
import { ContentTreeArray } from "@/utils/data";
import { FieldCountItem, formatDate, TagsDetailed } from "@/utils";
import { MicIcon, BookmarkIcon, CalendarIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import Pill from "./Pill";
import useURLManager from "@/service/URLManager/useURLManager";

const TranscriptDetailsCard = ({ data, pillCountLimit = 3, breadCrumbsComponent }: { data: ContentTreeArray; slug: string[], pillCountLimit?: number, breadCrumbsComponent?: React.ReactNode }) => {
  const { toggleFilterFromParams, toggleFilter, getFilter } = useURLManager();

  const selectedSpeakers = getFilter("authors");
  const selectedTags = getFilter("tags");

  const basePath = "/search";

  const { speakers, tagsDetailed,  summary, date, title, body, languageURL } = data;
  const speakersToDisplay = pillCountLimit ? speakers?.slice(0, pillCountLimit) : speakers;
  const tagsToDisplay = pillCountLimit ? tagsDetailed?.slice(0, pillCountLimit) : tagsDetailed;

  const calculateRemaining = (data: FieldCountItem[] | string[] | TagsDetailed[]) => {
    if (!pillCountLimit) return 0;
    // only truncate if data exceeds limit
    if (data?.length && data.length > pillCountLimit) {
      return data.length - pillCountLimit
    }
    return 0
  }

  const getSpeakerLink = (speaker: string) => {
    const baseFilterParam = toggleFilterFromParams({ filterType: "authors", filterValue: speaker });
    return `${basePath}?${baseFilterParam}`;
  }

  return (
    <div className='border border-gray-custom-1200 dark:border-gray-custom-1800 rounded-lg p-4 md:p-5 2xl:p-6 flex flex-col gap-3 md:gap-4'>
      <section className='flex md:flex-row flex-col justify-between gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full'>
          {breadCrumbsComponent}
          <a
            href={`${languageURL}`}
            className='font-bold text-base leading-[21.86px] md:text-xl 2xl:text-[22.5px] md:leading-[30px] text-orange-custom-100 md:text-black'
          >
            {title}
          </a>
        </div>
        {date && (
          <div className='md:self-start flex gap-2 items-center shrink-0'>
            <CalendarIcon className='w-[18px] md:w-[20px] dark:text-gray-custom-600' />
            <p className='text-xs md:text-sm 2xl:text-base leading-[17.6px] font-medium text-gray-custom-800 dark:text-gray-custom-600'>{formatDate(date!)}</p>
          </div>
        )}
      </section>

      <section className='flex flex-col gap-4'>
        {speakers?.length ? (
          <section className='flex gap-2'>
            <>
              <span>
                <MicIcon className='w-5 md:w-6 ' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] text-xs md:text-sm 2xl:text-base'>
                  {speakersToDisplay?.map((speaker, idx) => (
                    <Pill key={speaker} kind="link" name={speaker} slug={getSpeakerLink(speaker)} isSelected={selectedSpeakers.includes(speaker)}/>
                  ))}

                  {calculateRemaining(speakers) === 0 ? null : (
                    <p className='py-[2px] px-5 rounded-[5px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 lg:py-1 max-md:leading-[100%]'>
                      + {calculateRemaining(speakers)} more
                    </p>
                  )}
                </div>
              </div>
            </>
          </section>
        ) : null}

        <section className='flex gap-2'>
          {tagsDetailed?.length ? (
            <>
              <span>
                <BookmarkIcon className='w-5 md:w-6' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] text-xs md:text-sm 2xl:text-base'>
                  {tagsToDisplay?.map((tag, idx) => (
                    <Pill key={idx} kind="button" name={tag.name} value={tag.slug} type={"tags"} toggleFilter={toggleFilter} isSelected={selectedTags.includes(tag.slug)}/>
                  ))}

                  {calculateRemaining(tagsDetailed) === 0 ? null : (
                    <p className='py-[2px] px-5 rounded-[5px] dark:bg-gray-custom-2100 dark:hover:bg-gray-custom-1800 dark:hover:text-black bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 lg:py-1 max-md:leading-[100%]'>
                      + {calculateRemaining(tagsDetailed)} more
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
      </section>

      {summary || body ? (
        <section>
          <p className='text-sm md:text 2xl:text-base text-custom-black-custom-300 dark:text-black 2xl:leading-[25px] line-clamp-3' style={{"wordBreak": "break-word"}}>{summary ? summary : body}</p>
        </section>
      ) : null}
    </div>
  );
};

export default TranscriptDetailsCard;
