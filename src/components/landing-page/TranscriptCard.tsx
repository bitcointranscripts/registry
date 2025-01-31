import React from "react";
import { MicIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { Transcript } from "../../../.contentlayer/generated/types";
import { createSlug } from "@/utils";
import Link from "next/link";
import Pill from "@/components/common/Pill";
import useURLManager from "@/service/URLManager/useURLManager";
import { LanguageCode } from "@/config";
import useTranslations from "@/hooks/useTranslations";
import { generateNewUrlForLanguage } from "@/utils/locale";

interface TranscriptCardProps {
  data: Transcript;
  daysOpened?: number;
  transcripts?: number;
  source: string;
  languageCode: LanguageCode;
}

const TranscriptCard = ({ data, daysOpened, transcripts, source, languageCode }: TranscriptCardProps) => {
  const remainingSpeakers = data?.speakers?.length && data?.speakers.length > 2 ? data?.speakers.length - 2 : 0;
  const {toggleFilter} = useURLManager();

  const t = useTranslations(languageCode);

  return (
    <Link
      href={data.languageURL}
      className={`flex flex-col justify-between ${
        transcripts ? "min-w-[400px] max-md:min-w-[292px]" : "max-w-[580px] w-full"
      } p-6 gap-4 text-black border border-gray-custom-600 rounded-xl shadow-sm cursor-pointer max-2xl:p-[18px] max-md:p-4`}
    >
      <section className='flex flex-col'>
        <p className='text-gray-custom-600 max-xl:text-[13px] max-md:text-sm leading-[100%] pb-[10px] md:pb-4 line-clamp-1'>{source}</p>
        <section className='flex justify-between items-start gap-4'>
          <p className='text-xl font-medium max-xl:text-lg max-md:text-base'>{data?.title}</p>
          {daysOpened ? <p className='text-sm text-nowrap whitespace-normal text-gray-custom-800'>{daysOpened} days ago</p> : null}
        </section>
      </section>

      {transcripts ? (
        <p>{transcripts} {t("shared.transcripts")}</p>
      ) : (
        <section className='flex gap-[9px] items-center max-md:gap-1'>
          {data?.speakers?.length ? (
            <>
              <span>
                <MicIcon className='w-5' />
              </span>
              <div className='flex gap-[9px] flex-wrap'>
                <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                  {data?.speakers.slice(0, 2).map((speaker, idx) => (
                    <Pill key={speaker + idx} kind="button" name={speaker} toggleFilter={toggleFilter} type="authors" value={speaker} />
                  ))}

                  {remainingSpeakers === 0 ? null : (
                    <p className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                      + {remainingSpeakers} {t("shared.more")}
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
  languageCode,
}: {
  title: string;
  transcripts?: number;
  url: string;
  type: "CATEGORY" | "TYPE";
  languageCode: LanguageCode;
}) => {
  const parseUrl = createSlug(url);
  const t = useTranslations(languageCode);

  let linkUrl = "";
  switch (type) {
    case "CATEGORY":
      linkUrl = generateNewUrlForLanguage(`/categories#${parseUrl}`, languageCode);
      break;
    case "TYPE":
      linkUrl = generateNewUrlForLanguage(`/types#${parseUrl}`, languageCode);
      break;
    default:
      break;
  }

  return (
    <Link
      href={linkUrl}
      className={`flex flex-col min-w-[400px] max-md:min-w-[292px] p-6 gap-4 text-black border border-gray-custom-600 rounded-xl shadow-md cursor-pointer max-2xl:p-[18px] max-md:p-4`}
    >
      <section className='flex justify-between items-center gap-4'>
        <p className='text-xl font-medium max-xl:text-lg max-md:text-base capitalize'>{title}</p>
      </section>

      <p>{transcripts} {t("shared.transcripts")}</p>
    </Link>
  );
};

export default TranscriptCard;
