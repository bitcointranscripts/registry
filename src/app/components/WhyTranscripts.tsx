import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Wrapper } from ".";
import userTranscribing from "/public/images/user-typing.webp";
import wordList from "/public/images/word-list.png";
import bitcoinMap from "/public/images/bitcoin-map.png";

const WhyTranscripts = () => {
  return (
    <Wrapper className='py-[104px] text-black flex flex-col gap-[104px] max-md:py-16 max-md:gap-16'>
      <div className='flex flex-col items-center justify-center gap-12 max-md:gap-4'>
        <p className='text-purple-custom-200 bg-purple-custom-100 py-2 px-6 rounded-full max-md:text-sm max-md:py-[2px] max-md:px-3.5'>
          WHY TRANSCRIPTS?
        </p>
        <h2 className='2xl:text-[72px] text-[64px] leading-[86px] text-center font-medium max-w-[1500px] max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[40px] max-sm:leading-[56.4px] max-md:max-w-[368px]'>
          A Historical Archive for Knowledge Preservation and Propagation
        </h2>
      </div>

      <div className='flex justify-between items-center gap-[52px] max-md:flex-col max-lg:gap-8 max-md:gap-6'>
        <section className='max-w-[50%] flex flex-col max-md:items-start max-md:max-w-full'>
          <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>Transcripts Since 2014</h4>
          <p className='pt-6 pb-8 text-xl max-lg:text-base max-md:pb-6'>
            Bryan Bishop{" "}
            <span>
              <Link href={"/"} className='text-blue-custom-100 underline'>
                (@kanzure)
              </Link>
            </span>{" "}
            manually transcribed ~900 transcripts over the years, making them publicly available at{" "}
            <span>
              <Link href={"/"} className='text-blue-custom-100 underline'>
                diyhpluswiki
              </Link>
            </span>
            . Bitcoin Transcripts builds on kanzure's foundational work and is now actively maintained and enriched by the community.
          </p>
          <div className='flex items-center justify-center max-md:w-full'>
            <Link
              href='/transcripts'
              className='text-xl bg-orange-custom-100 text-white py-6 rounded-full flex items-center md:w-fit px-32 whitespace-nowrap justify-center h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8'
            >
              Explore Bitcoin Transcripts
            </Link>
          </div>
        </section>
        <section className='max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[261px]'>
          <Image src={userTranscribing} alt='user transcribing' className='w-full h-full' />
        </section>
      </div>

      <div className='flex justify-between items-center gap-[52px] max-md:flex-col-reverse max-md:items-start max-lg:gap-8 max-md:gap-6'>
        <section className='max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[277px]'>
          <Image src={wordList} alt='user transcribing' className='w-full h-full' />
        </section>
        <section className='max-w-[50%] flex flex-col max-md:max-w-full'>
          <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>Making Bitcoin Accessible</h4>
          <p className='pt-6 pb-8 text-xl max-lg:text-base max-md:pb-0'>
            Transcripts transform bitcoin knowledge into an easily accessible and searchable format. They help you find key details quickly,
            understand complex ideas better, and share important content with others. By turning spoken words into text, we make sure that valuable
            insights are always easy to access and explore.
          </p>
        </section>
      </div>

      <div className='flex justify-between items-center gap-[52px] max-md:flex-col max-md:items-start max-lg:gap-8 max-md:gap-6'>
        <section className='max-w-[50%] flex flex-col max-md:max-w-full'>
          <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>Contribute to the Project</h4>
          <p className='pt-6 pb-8 text-xl max-lg:text-base max-md:pb-6'>
            Help us expand and improve Bitcoin Transcripts by contributing your skills and knowledge. Join the community effort to preserve and share
            valuable Bitcoin content.
          </p>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <Link
              href='/transcripts'
              className='text-xl bg-orange-custom-100 text-white py-6 rounded-full flex items-center md:w-[85%] whitespace-nowrap justify-center px-32 h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8'
            >
              Review Transcripts, Earn Sats
            </Link>
            <button className='text-xl bg-orange-custom-200 border-gray-custom-300 text-orange-custom-400 py-6 rounded-full flex items-center md:w-[85%] whitespace-nowrap justify-center px-32 h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8'>
              Suggest Source for Transcription
            </button>
          </div>
        </section>
        <section className='max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[261px]'>
          <Image src={bitcoinMap} alt='user transcribing' className='w-full h-full' />
        </section>
      </div>
    </Wrapper>
  );
};

export default WhyTranscripts;
