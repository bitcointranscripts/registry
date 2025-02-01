"use client";

import React from "react";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import { ContentTreeArray } from "@/utils/data";
import { EsSearchResult } from "@/app/search/types";
import { twMerge } from "tailwind-merge";
import allSources from "@/public/sources-data.json";
import BaseCrumbLists from "../common/BaseCrumbLists";
import { getSourceBreadcrumbsFromSlug } from "@/utils/sources";
import { parseLanguageString } from "@/utils/locale";
import { getTopicTitle } from "@/utils/topic";
import { Topic } from "@/types";
import topics from "@/public/topics.json";

type Result = EsSearchResult["_source"];

export const SearchResultCard = ({
  result,
  className,
}: {
  result: Result;
  className?: string;
}) => {
  const {
    transcript_source,
    title,
    body,
    authors,
    tags,
    id,
    created_at: date,
    url,
    language,
    summary,
  } = result;

  const flattenedPath = new URL(url).pathname

  const parsedLanguage = parseLanguageString(language);

  const transcriptData: ContentTreeArray = {
    title,
    body: summary || body,
    speakers: authors,
    sourceFilePath: transcript_source,
    flattenedPath,
    languageURL: flattenedPath,
    date: date as unknown as string,
    tagsDetailed: tags?.map((tag) => ({ name: getTopicTitle(tag, topics as Topic[]), slug: tag })),
    language: parsedLanguage,
  };

  const breadCrumbs = getSourceBreadcrumbsFromSlug({
    slug: transcript_source.split("/"),
    current: allSources,
    language: parsedLanguage,
  });

  return (
    <div className={twMerge("mt-4", className || "")}>
      <TranscriptDetailsCard
        key={id}
        slug={flattenedPath.split("/")}
        data={transcriptData}
        pillCountLimit={5}
        breadCrumbsComponent={<BaseCrumbLists crumbsArray={breadCrumbs}/>}
        language={parsedLanguage}
      />
    </div>
  );
};

export default SearchResultCard;
