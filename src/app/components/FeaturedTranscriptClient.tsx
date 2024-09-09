"use client";

import React, { useState } from "react";
import { Transcript } from "contentlayer/generated";
import { DiceIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { TranscriptCard } from ".";

const FeaturedTranscriptClient = ({
  featuredTranscripts,
  latestTranscripts,
}: {
  featuredTranscripts: Transcript[];
  latestTranscripts: Array<Transcript & { days_opened: number }>;
}) => {
  const [featured, setFeatured] = useState(featuredTranscripts);

  const randomise = async () => {
    setFeatured([...featuredTranscripts].sort(() => 0.5 - Math.random()));
  };

  return (
    <div className='flex items-start flex-col gap-14 w-full z-10'>
      <section className='flex flex-col gap-6 w-full'>
        <section className='flex items-center justify-between w-full'>
          <h3 className='text-2xl font-semibold max-md:text-xl'>Featured Transcripts</h3>
          <button className='w-fit px-5 py-3 rounded-full border border-black flex gap-1 items-center max-md:py-1.5 max-md:px-3' onClick={randomise}>
            <span>
              <DiceIcon className='w-5 text-black max-md:w-3' />
            </span>
            <p className='leading-[19.2px] text-sm font-medium max-sm:text-xs'>Randomise</p>
          </button>
        </section>
        <div className='grid auto-rows-max gap-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3'>
          {featured.slice(0, 3).map((transcript, idx) => (
            <TranscriptCard data={transcript} key={idx} />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6 w-full'>
        <h3 className='text-2xl font-semibold max-md:text-xl'>Latest Transcripts</h3>
        <div className='grid auto-rows-max gap-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3'>
          {latestTranscripts.map((transcript, idx) => (
            <TranscriptCard data={transcript} daysOpened={transcript.days_opened} key={idx} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedTranscriptClient;
