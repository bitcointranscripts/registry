import { LanguageCode } from "@/config";
import { ExploreGroupedData, getDoubleDigits } from "@/utils";
import { generateNewUrlForLanguage } from "@/utils/locale";
import Link from "next/link";
import React from "react";

type SingleContent = {
  linkName: string;
  languageCode: LanguageCode;
} & ExploreGroupedData;
const SingleTranscriptContent = ({ count, slug, name, linkName, languageCode }: SingleContent) => {
  let url = ""

  // unnecessary prefetch for links that leads to search page (waterfall requests in network with little gains)
  let shouldPrefetch = true
  
  switch (linkName) {
    case "sources":
      url = languageCode === "en" ? `/${slug}` : `/${languageCode}/${slug}`;
      break;
    case "tags":
      url = generateNewUrlForLanguage(`/search?filter_tags=${slug}`, languageCode);
      shouldPrefetch = false;
      break;
    case "categories":
      url = generateNewUrlForLanguage(`/search?filter_tags=${slug}`, languageCode);
      shouldPrefetch = false;
      break;
    case "speakers":
      url = generateNewUrlForLanguage(`/search?filter_tags=${slug}`, languageCode);
      shouldPrefetch = false;
      break;
    case "types":
      url = languageCode === "en" ? `/${slug}` : `/${languageCode}/${slug}`;
    default:
      url = generateNewUrlForLanguage(`/${linkName}`, languageCode);
      break;
  }

  return (
    <Link
      href={url}
      className='flex capitalize cursor-pointer border max-w-[100%]  border-gray-custom-1200 rounded-[5px] justify-between items-center text-sm py-5 px-4 lg:py-7 2xl:px-6 2xl:text-lg font-semibold text-gray-custom-1100'
      prefetch={shouldPrefetch}
    >
      <span className='text-wrap break-words max-w-[80%]'>{name}</span>
      <span className='font-normal font-basis-mono'>{getDoubleDigits(count || 0)}</span>
    </Link>
  );
};

export default SingleTranscriptContent;
