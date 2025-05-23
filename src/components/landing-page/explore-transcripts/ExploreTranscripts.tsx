import React from "react";
import path from "path";
import * as fs from "fs";
import Wrapper from "@/components/layout/Wrapper";
import ExploreTranscriptClient from "./ExploreTranscriptClient";
import { LanguageCode } from "@/config";
import useTranslations from "@/hooks/useTranslations";

function getTags() {
  const filePath = path.join(process.cwd(), "public", "topics-by-category-counts.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

const getTypes = () => {
  const filePath = path.join(process.cwd(), "public", "types-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

const ExploreTranscripts = ({languageCode = LanguageCode.en }: {languageCode?: LanguageCode}) => {
  const categories = getTags()[languageCode].data;
  const types = getTypes()[languageCode].data;
  const t = useTranslations(languageCode);

  return (
    <Wrapper className='py-[104px] flex flex-col gap-14 text-black max-md:py-16 max-md:gap-12 max-w-full'>
      <h2 className='2xl:text-[72px] text-[64px] leading-[90px] text-center font-medium max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[36px] max-sm:leading-[48px]'>
        {t("home.explore.title")}
      </h2>
      <ExploreTranscriptClient categories={categories} types={types} languageCode={languageCode} />
    </Wrapper>
  );
};

export default ExploreTranscripts;
