"use client";

import React, { useState } from "react";
import { Transcript } from "contentlayer/generated";
import { DiceIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import SourceCountData from "@/public/source-count-data.json";
import TranscriptCard from "../TranscriptCard";
import useTranslations from "@/hooks/useTranslations";
import { LanguageCode } from "@/config";

const FeaturedTranscriptClient = ({
  featuredTranscripts,
  latestTranscripts,
  languageCode,
}: {
  featuredTranscripts: Transcript[];
  latestTranscripts: Array<Transcript & { days_opened: number }>;
  languageCode: LanguageCode;
}) => {
  const [featured, setFeatured] = useState(featuredTranscripts);

  const t = useTranslations(languageCode);

  const randomise = async () => {
    setFeatured([...featuredTranscripts].sort(() => 0.5 - Math.random()));
  };

  const getSourceFromTranscript = (data: Transcript) =>
    SourceCountData.find((source) => source.slug === data.slugAsParams[0])?.name ?? (data.slugAsParams as Array<string>)[0];

  return (
    <div className='flex items-start flex-col gap-14 w-full z-10'>
      <section className='flex flex-col gap-6 w-full'>
        <section className='flex items-center justify-between w-full'>
          <h3 className='text-2xl font-semibold max-md:text-xl'>{t("home.dive.featured-transcripts")}</h3>
          <button className='w-fit px-5 py-3 rounded-full border border-black flex gap-1 items-center max-md:py-1.5 max-md:px-3' onClick={randomise}>
            <span>
              <DiceIcon className='w-5 text-black max-md:w-3' />
            </span>
            <p className='leading-[19.2px] text-sm font-medium max-sm:text-xs'>{t("home.dive.randomize")}</p>
          </button>
        </section>
        <div className='grid auto-rows-max gap-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3'>
          {featured.slice(0, 6).map((transcript, idx) => (
            <TranscriptCard data={transcript} key={idx} source={getSourceFromTranscript(transcript)} languageCode={languageCode} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedTranscriptClient;
