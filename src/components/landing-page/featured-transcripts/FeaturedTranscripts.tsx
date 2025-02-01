import React from "react";
import { extractTranscripts } from "@/utils";
import { allTranscripts } from "contentlayer/generated";
import Wrapper from "@/components/layout/Wrapper";
import FeaturedTranscriptClient from "./FeaturedTranscriptClient";
import { LanguageCode } from "@/config";
import useTranslations from "@/hooks/useTranslations";

const FeaturedTranscripts = ({languageCode = LanguageCode.en }: {languageCode?: LanguageCode}) => {
  const t = useTranslations(languageCode);
  const { latestTranscripts, featuredTranscripts } = extractTranscripts(allTranscripts, languageCode);

  return (
    <div className='flex items-center justify-center w-full bg-gray-custom-100'>
      <Wrapper className='py-[104px] flex flex-col gap-14 text-black max-md:py-16 max-md:gap-12'>
        <h2 className='2xl:text-[72px] text-[64px] leading-[90px] text-center font-medium max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[40px] max-sm:leading-[48px]'>
          {t("home.dive.title")}
        </h2>
        <FeaturedTranscriptClient featuredTranscripts={featuredTranscripts} latestTranscripts={latestTranscripts} languageCode={languageCode} />
      </Wrapper>
    </div>
  );
};

export default FeaturedTranscripts;
