import React from "react";
import Link from "next/link";
import Image from "next/image";

import HeroImageDesktop from "/public/images/hero-desktop-image.webp";
import HeroImageDesktopDark from "/public/images/hero-desktop-image-dark.png";
import { ArrowLinkUpRight } from "@bitcoin-dev-project/bdp-ui/icons";
import circleBackground from "/public/svgs/circle-background.svg";
import circleBackgroundDark from "/public/svgs/circle-background-dark.svg";
import circleBackgroundMobile from "/public/svgs/circle-background-mobile.svg";
import circleBackgroundMobileDark from "/public/svgs/circle-background-mobile-dark.svg";
import mobileHeroImage from "/public/svgs/mobile-hero-image.svg";
import mobileHeroImageDark from "/public/images/mobile-hero-image-dark.png";
import Wrapper from "../layout/Wrapper";

const HeroSection = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Wrapper className="flex items-center justify-between min-h-[calc(100vh-121px)] pr-0 max-md:flex-col max-md:items-start max-md:justify-normal max-md:gap-6 max-md:pt-14 max-md:min-h-fit max-md:px-0 z-10 relative overflow-hidden">
        <section className="w-[40%] flex flex-col gap-10 max-md:w-full max-md:gap-6 max-md:px-4">
          <section className="text-black dark:text-white flex flex-col gap-6 max-md:max-w-[368px]">
            <h1 className="2xl:text-[72px] text-[64px] leading-[130%] max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[42px]">
              Unlock the treasure trove of technical bitcoin transcripts
            </h1>
            <p className="text-xl max-lg:text-lg max-md:text-base text-wrap">
              <span className="font-bold">1042+ transcripts</span> growing every
              day.{" "}
              <span className="whitespace-nowrap">
                Thanks to people like you.
              </span>
            </p>
          </section>
          <Link
            href="/categories"
            className="flex justify-between items-center h-20 px-8 bg-orange-custom-100 rounded-full w-[90%] max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full"
          >
            <p className="text-xl text-white font-semibold text-nowrap max-lg:text-lg max-md:text-base">
              Explore Transcripts
            </p>
            <ArrowLinkUpRight className="text-white w-6" />
          </Link>
        </section>

        <section className="max-w-[58%] max-md:w-full max-md:max-w-full max-md:flex max-md:items-center max-md:justify-center ">
          <Image
            src={HeroImageDesktop}
            alt="transcript desktop card"
            className="w-full max-h-[437px] max-md:max-w-full max-md:h-[180px] max-sm:h-[460px] max-md:hidden dark:hidden"
            placeholder="blur"
            priority
          />
          <Image
            src={HeroImageDesktopDark}
            alt="transcript desktop card"
            className="w-full max-h-[437px] bg-dark-custom-100  hidden dark:block dark:max-md:hidden max-md:max-w-full max-md:h-[180px] max-sm:h-[460px] max-md:hidden"
            placeholder="blur"
            priority
          />
          <Image
            src={mobileHeroImage}
            alt="transcript mobile card"
            className="w-full max-h-[460px] max-md:max-w-[433px] md:hidden dark:hidden"
            priority
          />
          <Image
            src={mobileHeroImageDark}
            alt="transcript mobile card"
            className="w-full max-h-[460px] hidden max-md:max-w-[433px] md:hidden dark:block dark:md:hidden"
            priority
          />
        </section>
        <div className="absolute right-0 top-0 bottom-0 -z-10 w-[50vw] max-md:w-[100vw] max-md:left-0 max-md:right-0 max-md:bottom-[-200px] overflow-hidden flex items-center justify-center h-full max-md:top-[100px] max-sm:top-[50px]">
          <Image
            src={circleBackground}
            alt="circle background"
            className="w-full h-full max-md:hidden dark:hidden"
          />
          <Image
            src={circleBackgroundDark}
            alt="circle background"
            className="w-full hidden h-full max-md:hidden dark:max-md:hidden dark:block"
          />
          <Image
            src={circleBackgroundMobile}
            alt="circle background"
            className="w-full h-full md:hidden -z-10 dark:hidden"
          />
          <Image
            src={circleBackgroundMobileDark}
            alt="circle background"
            className="w-full h-full hidden md:hidden -z-10 dark:block dark:md:hidden"
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default HeroSection;
