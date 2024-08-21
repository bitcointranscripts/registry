"use client";

import React from "react";
import { Wrapper, TranscriptCard } from ".";
import { ArrowLinkRight } from "bdp-ui/icons";

const dummyTranscripts = [
  { title: "Backup and Recovery", transcripts: 12 },
  { title: "Contract Protocols", transcripts: 12 },
  { title: "Fee Management", transcripts: 12 },
  { title: "Fee Management", transcripts: 12 },
  { title: "Fee Management", transcripts: 12 },
  { title: "Fee Management", transcripts: 12 },
];

const CarouselButton = ({ className, onClick }: { className: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='border border-black rounded-full h-12 w-12 flex items-center justify-center relative max-md:h-10 max-md:w-10'
    >
      <ArrowLinkRight className={`text-black w-6 max-md:w-5 ${className}`} />
    </button>
  );
};

const ExploreTranscripts = () => {
  return (
    <Wrapper className='py-[104px] flex flex-col gap-14 text-black max-md:py-16 max-md:gap-12'>
      <h2 className='2xl:text-[72px] text-[64px] leading-[90px] text-center font-medium max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[36px] max-sm:leading-[48px]'>
        Explore Transcripts
      </h2>
      <div className='flex items-start flex-col gap-14 w-full max-md:gap-10'>
        <section className='flex flex-col gap-6 w-full'>
          <section className='flex items-center gap-4 w-full'>
            <h3 className='text-2xl font-semibold max-md:text-xl'>Categories</h3>
            <button className='w-fit px-5 py-[6px] rounded-full border border-black flex gap-1 items-center max-md:py-1 max-md:px-3'>
              <p className='leading-[19.2px] text-sm font-medium'>View All</p>
              <ArrowLinkRight className='text-black w-6 max-md:w-5' />
            </button>
          </section>

          <section className='flex flex-col gap-4'>
            <div className='flex justify-between gap-5 overflow-x-scroll '>
              {dummyTranscripts.map((transcript, idx) => (
                <TranscriptCard title={transcript.title} transcripts={transcript.transcripts} key={idx} />
              ))}
            </div>
            <div className='flex items-center gap-[18px] justify-center'>
              <CarouselButton className='rotate-180 absolute' onClick={() => {}} />
              <CarouselButton className={""} onClick={() => {}} />
            </div>
          </section>
        </section>

        <section className='flex flex-col gap-6 w-full'>
          <section className='flex items-center gap-4 w-full'>
            <h3 className='text-2xl font-semibold max-md:text-xl'>Types</h3>
            <button className='w-fit px-5 py-[6px] rounded-full border border-black flex gap-1 items-center max-md:py-1 max-md:px-3'>
              <p className='leading-[19.2px] text-sm font-medium'>View All</p>
              <span>
                <ArrowLinkRight className='text-black w-6 max-md:w-5' />
              </span>
            </button>
          </section>

          <section className='flex flex-col gap-4'>
            <div className='flex justify-between gap-5 overflow-x-scroll'>
              {dummyTranscripts.map((transcript, idx) => (
                <TranscriptCard title={transcript.title} transcripts={transcript.transcripts} key={idx} />
              ))}
            </div>
            <div className='flex items-center gap-[18px] justify-center'>
              <CarouselButton className='rotate-180 absolute' onClick={() => {}} />
              <CarouselButton className={""} onClick={() => {}} />
            </div>
          </section>
        </section>
      </div>
    </Wrapper>
  );
};

export default ExploreTranscripts;
