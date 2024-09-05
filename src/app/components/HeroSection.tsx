import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Wrapper } from ".";
import HeroImageDestop from "/public/images/hero-desktop-image.webp";
import HeroImageMobile from "/public/images/hero-mobile-image.webp";
import { ArrowLinkUpRight } from "@bitcoin-dev-project/bdp-ui/icons";

const HeroSection = () => {
  return (
    <Wrapper className='flex items-center justify-between min-h-[calc(100vh-141px)] pr-0 max-md:flex-col max-md:items-start max-md:justify-normal max-md:gap-6 max-md:pt-14 max-md:min-h-fit max-md:px-0'>
      <section className='w-[40%] flex flex-col gap-10 max-md:w-full max-md:gap-6 max-md:px-4'>
        <section className='text-black flex flex-col gap-6 max-md:max-w-[368px]'>
          <h1 className='2xl:text-[72px] text-[64px] leading-[130%] max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[42px]'>
            Unlock the treasure trove of technical bitcoin transcripts
          </h1>
          <p className='text-xl max-lg:text-lg max-md:text-base'>
            <span className='font-bold'>1042+ transcripts</span> growing every day. Thanks to people <br /> like you.
          </p>
        </section>
        <Link
          href='https://btctranscripts.com/'
          className='flex justify-between items-center h-20 px-8 bg-orange-custom-100 rounded-full w-[90%] max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full'
        >
          <p className='text-xl text-white font-semibold text-nowrap max-lg:text-lg max-md:text-base'>Explore Transcripts</p>
          <ArrowLinkUpRight className='text-white w-6' />
        </Link>
      </section>

      <section className='max-w-[58%] max-md:w-full max-md:max-w-full max-md:flex max-md:items-center max-md:justify-center '>
        <Image
          src={HeroImageDestop}
          alt='transcript desktop card'
          className='w-full max-h-[437px] max-md:max-w-full max-md:h-[180px] max-sm:h-[460px] max-md:hidden'
          placeholder='blur'
          priority
        />
        <Image
          src={HeroImageMobile}
          alt='transcript mobile card'
          className='w-full max-h-[460px] max-md:max-w-[433px] md:hidden'
          placeholder='blur'
          priority
        />
      </section>
    </Wrapper>
  );
};

export default HeroSection;
