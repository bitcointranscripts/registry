import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentTreeArray } from "@/utils/data";
import DateIcon from "/public/svgs/date-icon.svg";
import TagsIcon from "/public/svgs/tags-icon.svg";
import { createSlug, formatDate, unsluggify } from "@/utils";
import { MicIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import Pill from "./Pill";

const TranscriptDetailsCard = ({ data, slug }: { data: ContentTreeArray; slug: string[] }) => {
  const { speakers, tags, summary, date, title, body, languageURL } = data;

  const calculateRemaining = (data: string[]) => (data?.length && data.length > 3 ? data.length - 3 : 0);

  return (
    <div className='border border-gray-custom-1200 rounded-lg p-4 md:p-5 2xl:p-6 flex flex-col gap-3 md:gap-4'>
      <section className='flex justify-between'>
        <div className='flex md:flex-row flex-col justify-between gap-2 w-full'>
          <Link
            href={`${languageURL}`}
            className='font-bold text-base leading-[21.86px] md:text-xl 2xl:text-[22.5px] md:leading-[30px] text-orange-custom-100 md:text-black'
          >
            {title}
          </Link>
          {date && (
            <div className='flex gap-2 items-center h-fit'>
              <Image src={DateIcon} alt='date icon' className='w-[18px] md:w-[20px]' />
              <p className='text-xs md:text-sm 2xl:text-base leading-[17.6px] font-medium text-gray-custom-800'>{formatDate(date!)}</p>
            </div>
          )}
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        {speakers?.length ? (
          <section className='flex gap-2 items-center max-md:gap-1'>
            <>
              <span>
                <MicIcon className='w-5 md:w-6' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {speakers.slice(0, 3).map((speaker, idx) => (
                    <Pill key={speaker} name={speaker} slug={`/speakers/${createSlug(speaker)}`}  />
                  ))}

                  {calculateRemaining(speakers) === 0 ? null : (
                    <p className='py-[2px] px-5 rounded-[5px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 lg:py-1 max-2xl:text-sm max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {calculateRemaining(speakers)} more
                    </p>
                  )}
                </div>
              </div>
            </>
          </section>
        ) : null}

        <section className='flex gap-2 items-center max-md:gap-1'>
          {tags?.length ? (
            <>
              <span>
                <Image src={TagsIcon} alt='date icon' className='w-5 md:w-6' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {tags.slice(0, 3).map((tag, idx) => (
                    <Pill key={idx} name={tag} slug={`/tags/${createSlug(tag)}`}  />
                  ))}

                  {calculateRemaining(tags) === 0 ? null : (
                    <p className='py-[2px] px-5 rounded-[5px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 lg:py-1 max-2xl:text-sm max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {calculateRemaining(tags)} more
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
          <p className='text-sm md:text 2xl:text-base text-custom-black-custom-300 2xl:leading-[25px] line-clamp-3'>{summary ? summary : body}</p>
        </section>
      ) : null}
    </div>
  );
};

export default TranscriptDetailsCard;
