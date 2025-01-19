"use client";

import React from "react";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import { ContentTreeArray } from "@/utils/data";
import { EsSearchResult } from "@/app/search/types";
import { twMerge } from "tailwind-merge";
import allSources from "@/public/sources-data.json";
import BaseCrumbLists from "../common/BaseCrumbLists";
import { getSourceBreadcrumbsFromSlug } from "@/utils/sources";
import { getTopicTitle } from "@/utils/search";
import { LanguageCode, LanguageCodes } from "@/config";

type Result = EsSearchResult["_source"];

export const SearchResultCard = ({ result, className }: { result: Result, className?: string }) => {
  const { transcript_source, title, body, authors, tags, id, created_at: date, url, language, summary } = result;
  
  const flattenedPath = new URL(url).pathname.split("/").slice(1).join("/");

  const parsedLanguage = LanguageCodes.find(lan => lan === language)
  
  const transcriptData: ContentTreeArray = {
    title,
    body: summary || body,
    speakers: authors,
    sourceFilePath: transcript_source,
    flattenedPath,
    languageURL: flattenedPath,
    date: date as unknown as string,
    tagsDetailed: tags?.map((tag) => ({ name: getTopicTitle(tag), slug: tag })),
  }

  const breadCrumbs = getSourceBreadcrumbsFromSlug({
    slug: transcript_source.split("/"),
    current: allSources,
    language: parsedLanguage ?? LanguageCode.en,
  })

  return (
    <div className={twMerge("mt-4", className || "")}>
      <TranscriptDetailsCard key={id} slug={flattenedPath.split("/")} data={transcriptData} pillCountLimit={5} breadCrumbsComponent={<BaseCrumbLists crumbsArray={breadCrumbs} />} />
    </div>
  );
}; 

export default SearchResultCard