import React from "react";
import { DiceIcon } from "bdp-ui/icons";
import { Wrapper, TranscriptCard } from ".";

const dummyTranscripts = [
  { title: "Checking Bitcoin Balances Privately", speakers: ["David Vorick", "David Vorick", "David Vorick", "David Vorick"] },
  {
    title: "Checking Bitcoin Balances Privately",
    speakers: ["David Vorick", "David Vorick", "David Vorick", "David Vorick", "David Vorick", "David Vorick"],
  },
  {
    title: "Checking Bitcoin Balances Privately",
    speakers: ["David Vorick", "David Vorick", "David Vorick", "David Vorick", "David Vorick", "David Vorick", "David Vorick"],
  },
];

const dummyTranscriptsWithDate = [
  { title: "Checking Bitcoin Balances Privately", speakers: ["David Vorick"], transcribed: "2 days ago" },
  { title: "Checking Bitcoin Balances Privately", speakers: ["David Vorick"], transcribed: "2 days ago" },
  { title: "Checking Bitcoin Balances Privately", speakers: ["David Vorick"], transcribed: "2 days ago" },
];

const FeaturedTranscripts = () => {
  return (
    <Wrapper className='py-[104px] flex flex-col gap-14 text-black bg-gray-custom-100 max-md:py-16 max-md:gap-12'>
      <h2 className='2xl:text-[72px] text-[64px] leading-[90px] text-center font-medium max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[40px] max-sm:leading-[48px]'>
        Dive into Transcripts
      </h2>
      <div className='flex items-start flex-col gap-14 w-full'>
        <section className='flex flex-col gap-6 w-full'>
          <section className='flex items-center justify-between w-full'>
            <h3 className='text-2xl font-semibold max-md:text-xl'>Featured Transcripts</h3>
            <button className='w-fit px-5 py-3 rounded-full border border-black flex gap-1 items-center max-md:py-1.5 max-md:px-3'>
              <span>
                <DiceIcon className='w-5 text-black max-md:w-3' />
              </span>
              <p className='leading-[19.2px] text-sm font-medium max-sm:text-xs'>Randomise</p>
            </button>
          </section>
          <div className='grid auto-rows-max gap-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3'>
            {dummyTranscripts.map((transcript, idx) => (
              <TranscriptCard title={transcript.title} speakers={transcript.speakers} key={idx} />
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-6 w-full'>
          <h3 className='text-2xl font-semibold max-md:text-xl'>Latest Transcripts</h3>
          <div className='grid auto-rows-max gap-5 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-2 grid-cols-3'>
            {dummyTranscriptsWithDate.map((transcript, idx) => (
              <TranscriptCard title={transcript.title} speakers={transcript.speakers} transcribed={transcript.transcribed} key={idx} />
            ))}
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default FeaturedTranscripts;
