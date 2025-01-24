"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import wordList from "/public/images/word-list.webp";
import bitcoinMap from "/public/images/bitcoin-map.png";
import Wrapper from "../layout/Wrapper";
import SuggestModal from "./SuggestionModal";
import { LanguageCode } from "@/config";
import useTranslations from "@/hooks/useTranslations";
import { generateNewUrlForLanguage } from "@/utils/locale";

const WhyTranscripts = ({languageCode = LanguageCode.en }: {languageCode?: LanguageCode}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const t = useTranslations(languageCode);

  React.useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <div className='flex items-center justify-center w-full bg-gray-custom-900'>
      <Wrapper className='py-[104px] text-black flex flex-col gap-[104px] max-md:py-16 max-md:gap-12'>
        <div className='flex flex-col items-center justify-center gap-12 max-md:gap-4'>
          <p className='text-purple-custom-200 bg-purple-custom-100 py-2 px-6 rounded-full max-md:text-sm max-md:py-[2px] max-md:px-3.5'>
            {t("home.why.header")}
          </p>
          <h2 className='2xl:text-[72px] text-[64px] leading-[86px] text-center font-medium max-w-[1500px] max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[40px] max-sm:leading-[56.4px] max-md:max-w-[368px]'>
            {t("home.why.title")}
          </h2>
        </div>

        <div className='flex justify-between items-center gap-[69px] max-md:flex-col max-lg:gap-8 max-md:gap-6'>
          <section className='max-w-[50%] flex flex-col max-md:items-start max-md:max-w-full'>
            <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>{t("home.why.history.title")}</h4>
            <p className='pt-6 pb-8 md:text-base lg:text-xl 2xl:text-2xl 2xl:leading-[33.84px] max-md:pb-[18px] max-md:pt-[18px]'>
              Bryan Bishop{" "}
              <span>
                <Link href='https://github.com/kanzure' target='_blank' className='text-blue-custom-100 underline'>
                  (@kanzure)
                </Link>
              </span>{" "}
              {t("home.why.history.content-1")}{" "}
              <span>
                <Link href='https://github.com/kanzure/diyhpluswiki' target='_blank' className='text-blue-custom-100 underline'>
                  diyhpluswiki.
                </Link>
                <br />
                {t("home.why.history.content-2")}
              </span>
              <br /> <br /> {t("home.why.history.content-3")}
            </p>
            <div className='flex items-center justify-center max-md:w-full'>
              <Link
                href={generateNewUrlForLanguage('/categories', languageCode)}
                className='text-xl bg-orange-custom-100 text-white py-6 rounded-full flex items-center md:w-fit px-32 whitespace-nowrap justify-center h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8'
              >
                {t("home.why.history.cta")}
              </Link>
            </div>
          </section>
          <section className='w-full rounded-[20px] max-md:rounded-[10px] overflow-hidden grow max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[261px]'>
            <video src='/clips/bryan-typing-video.mp4' autoPlay loop muted playsInline className='w-full h-full object-cover' />
          </section>
        </div>

        <div className='flex justify-between items-center gap-[69px] max-md:flex-col-reverse max-md:items-start max-lg:gap-8 max-md:gap-6 w-full'>
          <section className='max-w-[50%] max-h-[612px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[277px]'>
            <Image src={wordList} loading='lazy' alt='words list' height={612} width={890} />
          </section>

          <section className='max-w-[841px] w-[50%] flex flex-col max-md:max-w-full max-md:w-full'>
            <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>{t("home.why.accessibility.title")}</h4>
            <p className='pt-6 pb-8 md:text-base lg:text-xl 2xl:text-2xl 2xl:leading-[39.12px] max-md:pb-0 max-md:pt-[18px]'>
              {t("home.why.accessibility.content")}
            </p>
          </section>
        </div>

        <div className='flex justify-between items-center gap-[69px] max-md:flex-col max-md:items-start max-lg:gap-8 max-md:gap-6'>
          <section className='max-w-[890px] w-[50%] flex flex-col max-md:max-w-full max-md:w-full'>
            <h4 className='text-5xl font-medium max-lg:text-3xl max-md:text-2xl leading-[130%]'>{t("home.why.contribute.title")}</h4>
            <p className='pt-6 pb-8 md:text-base lg:text-xl 2xl:text-2xl 2xl:leading-[33.84px] max-md:pb-[18px] max-md:pt-[18px]'>
              {t("home.why.contribute.content")}
            </p>
            <div className='flex flex-col gap-4 items-center justify-center'>
              <Link
                href='https://review.btctranscripts.com/'
                target='_blank'
                className='text-xl bg-orange-custom-100 text-white py-6 rounded-full flex items-center md:w-[85%] whitespace-nowrap justify-center px-32 h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8 cursor-pointer'
              >
                {t("home.why.contribute.cta")}
              </Link>
              <button
                className='text-xl bg-orange-custom-200 border-gray-custom-300 text-orange-custom-400 py-6 rounded-full flex items-center md:w-[85%] whitespace-nowrap justify-center px-32 h-20 max-xl:h-[72px] max-lg:h-16 max-md:h-14 max-lg:w-full max-md:w-full font-semibold text-nowrap max-lg:text-lg max-md:text-base max-lg:px-16 max-md:px-8 cursor-pointer hidden'
                onClick={() => setIsOpen(!isOpen)}
              >
                {t("home.why.contribute.suggest-transcript")}
              </button>
            </div>
          </section>
          <section className='max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[261px]'>
            <Image src={bitcoinMap} loading='lazy' alt='bitcoin map' height={538} width={890} />
          </section>
        </div>
        <SuggestModal handleClose={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </Wrapper>
    </div>
  );
};

export default WhyTranscripts;
