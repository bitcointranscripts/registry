import React from "react";
import Link from "next/link";
import Image from "next/image";

import HeroImageDestop from "/public/images/hero-desktop-image.webp";
import { ArrowLinkUpRight } from "@bitcoin-dev-project/bdp-ui/icons";
import circleBackground from "/public/svgs/circle-background.svg";
import circleBackgroundMobile from "/public/svgs/circle-background-mobile.svg";
import mobileDesktopImage from "/public/svgs/mobile-desktop-image.svg";
import Wrapper from "../layout/Wrapper";
import useTranslations from "@/hooks/useTranslations";
import { LanguageCode } from "@/config";
import { generateNewUrlForLanguage } from "@/utils/locale";

const HeroSection = ({languageCode}: {languageCode: LanguageCode}) => {
  const t = useTranslations(languageCode);
  return (
    <div className='flex items-center justify-center w-full'>
      <Wrapper className='flex items-center justify-between min-h-[calc(100vh-121px)] pr-0 max-md:flex-col max-md:items-start max-md:justify-normal max-md:gap-6 max-md:pt-14 max-md:min-h-fit max-md:px-0 z-10 relative overflow-hidden'>
        <section className='w-[40%] flex flex-col gap-10 max-md:w-full max-md:gap-6 max-md:px-4'>
          <section className='text-black flex flex-col gap-6 max-md:max-w-[368px]'>
            <h1 className='2xl:text-[72px] text-[64px] leading-[130%] max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[42px]'>
              {t("home.hero.title")}
            </h1>
            <p className='text-xl max-lg:text-lg max-md:text-base text-wrap'>
              <span className='font-bold'>{t("home.hero.subtitle-1")}</span> {t("home.hero.subtitle-2")}{" "}
              <span className='whitespace-nowrap'>{t("home.hero.subtitle-3")}</span>
            </p>
          </section>
          <Link
            href={generateNewUrlForLanguage('/categories', languageCode)}
            className='flex justify-between items-center h-20 px-8 bg-orange-custom-100 rounded-full w-[90%] max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full'
          >
            <p className='text-xl text-white font-semibold text-nowrap max-lg:text-lg max-md:text-base'>{t("home.hero.cta")}</p>
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
          <Image src={mobileDesktopImage} alt='transcript mobile card' className='w-full max-h-[460px] max-md:max-w-[433px] md:hidden' priority />
        </section>
        <div className='absolute right-0 top-0 bottom-0 -z-10 w-[50vw] max-md:w-[100vw] max-md:left-0 max-md:right-0 max-md:bottom-[-200px] overflow-hidden flex items-center justify-center h-full max-md:top-[100px] max-sm:top-[50px]'>
          <Image src={circleBackground} alt='circle background' className='w-full h-full max-md:hidden' />
          <Image src={circleBackgroundMobile} alt='circle background' className='w-full h-full md:hidden -z-10' />
        </div>
      </Wrapper>
    </div>
  );
};

export default HeroSection;
