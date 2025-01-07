import React from "react";
import { MicIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { Transcript } from "../../../.contentlayer/generated/types";
import { createSlug } from "@/utils";
import Link from "next/link";
import Pill from "@/components/common/Pill";
import useURLManager from "@/service/URLManager/useURLManager";

interface TranscriptCardProps {
  data: Transcript;
  daysOpened?: number;
  transcripts?: number;
  source: string;
}

const TranscriptCard = ({ data, daysOpened, transcripts, source }: TranscriptCardProps) => {
  const remainingSpeakers = data?.speakers?.length && data?.speakers.length > 2 ? data?.speakers.length - 2 : 0;
  const {toggleFilter} = useURLManager();

  return (
    <Link
      href={data.url}
      className={`flex flex-col justify-between ${
        transcripts ? "min-w-[400px] max-md:min-w-[292px]" : "max-w-[580px] w-full"
      } p-6 gap-4 text-black border border-gray-custom-600 rounded-xl shadow-sm cursor-pointer max-2xl:p-[18px] max-md:p-4`}
    >
      <section className='flex flex-col'>
        <p className='text-gray-custom-600 max-xl:text-[13px] max-md:text-sm leading-[100%] pb-[10px] md:pb-4 line-clamp-1  dark:text-gray-custom-600'>{source}</p>
        <section className='flex justify-between items-start gap-4'>
          <p className='text-xl font-medium max-xl:text-lg max-md:text-base dark:text-gray-custom-100'>{data?.title}</p>
          {daysOpened ? <p className='text-sm text-nowrap whitespace-normal text-gray-custom-800  dark:text-gray-custom-100'>{daysOpened} days ago</p> : null}
        </section>
      </section>

      {transcripts ? (
        <p>{transcripts} Transcripts</p>
      ) : (
        <section className='flex gap-[9px] items-center max-md:gap-1'>
          {data?.speakers?.length ? (
            <>
              <span>
                <MicIcon className='w-5 dark:text-gray-custom-100' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {data?.speakers.slice(0, 2).map((speaker, idx) => (
                    <Pill key={speaker + idx} kind="button" name={speaker} toggleFilter={toggleFilter} type="authors" value={speaker} />
                  ))}

                  {remainingSpeakers === 0 ? null : (
                    <p className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 dark:bg-gray-custom-1800  dark:text-gray-custom-100
                      whitespace-nowrap text-nowrap max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {remainingSpeakers} more
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </section>
      )}
    </Link>
  );
};

export const ExploreTranscriptCard = ({
  title,
  transcripts,
  url,
  type,
}: {
  title: string;
  transcripts?: number;
  url: string;
  type: "CATEGORY" | "TYPE";
}) => {
  const parseUrl = createSlug(url);

  let linkUrl = "";
  switch (type) {
    case "CATEGORY":
      linkUrl = `/categories#${parseUrl}`;
      break;
    case "TYPE":
      linkUrl = `/types#${parseUrl}`;
      break;
    default:
      break;
  }

  return (
    <a
      href={linkUrl}
      className={`flex flex-col min-w-[400px] max-md:min-w-[292px] p-6 gap-4 text-black dark:text-gray-custom-100
        border border-gray-custom-600  dark:border-gray-custom-1800
        rounded-xl shadow-md cursor-pointer max-2xl:p-[18px] max-md:p-4`}
    >
      <section className='flex justify-between items-center gap-4'>
        <p className='text-xl font-medium max-xl:text-lg max-md:text-base capitalize'>{title}</p>
      </section>

      <p>{transcripts} Transcripts</p>
    </a>
  );
};

export default TranscriptCard;
