import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ContentTreeArray } from "@/utils/data";
import DateIcon from "/public/svgs/date-icon.svg";
import TagsIcon from "/public/svgs/tags-icon.svg";
import { createSlug, formatDate, unsluggify } from "@/utils";
import { MicIcon } from "@bitcoin-dev-project/bdp-ui/icons";

const TranscriptDetailsCard = ({ data, slug }: { data: ContentTreeArray; slug: string[] }) => {
  const { speakers, tags, summary, date, title, body, flattenedPath: url } = data;
  const calculateRemaining = (data: string[]) => (data?.length && data.length > 3 ? data.length - 3 : 0);

  return (
    <div className='border border-gray-custom-1200 rounded-lg p-6 flex flex-col gap-4'>
      <section className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2'>
            {slug
              .join(" / ")
              .split(" ")
              .map((slg, i) => (
                <p
                  key={`${slg}-${i}`}
                  className={`text-base leading-[20.64px] ${
                    slg === "/" ? " text-custom-black-custom-200" : "text-gray-custom-800"
                  } font-medium capitalize`}
                >
                  {unsluggify(slg)}
                </p>
              ))}
          </div>
          <Link href={`/${url}`} className='font-bold text-[22.5px] leading-[30px] text-black'>
            {title}
          </Link>
        </div>
        <div className='flex gap-2 items-center h-fit'>
          <Image src={DateIcon} alt='date icon' width={20} height={20} />
          <p className='text-base leading-[17.6px] font-medium text-gray-custom-800'>{formatDate(date!)}</p>
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <section className='flex gap-2 items-center max-md:gap-1'>
          {speakers?.length ? (
            <>
              <span>
                <MicIcon className='w-6' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {speakers.slice(0, 4).map((speaker, idx) => (
                    <Link
                      key={idx}
                      href={`/speakers/${createSlug(speaker)}`}
                      className='py-1 px-5 capitalize rounded-[5px] bg-custom-white-custom-100 text-base leading-[21.86px] font-medium max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm border border-gray-custom-1500 max-md:leading-[100%] cursor-pointer'
                    >
                      {speaker}
                    </Link>
                  ))}

                  {calculateRemaining(speakers) === 0 ? null : (
                    <p className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {calculateRemaining(speakers)} more
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
        <section className='flex gap-2 items-center max-md:gap-1'>
          {tags?.length ? (
            <>
              <span>
                <Image src={TagsIcon} alt='date icon' width={24} height={24} />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {tags.slice(0, 4).map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/tags/${createSlug(tag)}`}
                      className='py-1 capitalize px-5 rounded-[5px] bg-custom-white-custom-100 text-base leading-[21.86px] font-medium max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm border border-gray-custom-1500 max-md:leading-[100%]'
                    >
                      {unsluggify(tag)}
                    </Link>
                  ))}

                  {calculateRemaining(tags) === 0 ? null : (
                    <p className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {calculateRemaining(tags)} more
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
      </section>

      <section>
        <p className=' text-base text-custom-black-custom-300 leading-[25px]'>{summary}</p>
      </section>
    </div>
  );
};

export default TranscriptDetailsCard;
