"use client";

import React from "react";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import { ContentTreeArray } from "@/utils/data";
import { EsSearchResult } from "@/app/search/types";
import { unsluggify } from "@/utils";
import topics from "@/public/topics.json"
import { twMerge } from "tailwind-merge";

type Result = EsSearchResult["_source"];

const getTopicTitle = (slug: string) => {
  const title = topics.find(topic => topic.slug === slug || topic.aliases?.includes(slug))?.title
  if (title) return title;
  const saneCapitalization = unsluggify(slug).split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
  return saneCapitalization;
}

export const SearchResultCard = ({ result, className }: { result: Result, className?: string }) => {
  const { transcript_source, title, body, authors, tags, id, indexed_at: date, url } = result;
  
  const flattenedPath = new URL(url).pathname.split("/").slice(1).join("/");
  
  const transcriptData: ContentTreeArray = {
    title,
    body,
    speakers: authors,
    sourceFilePath: transcript_source,
    flattenedPath,
    languageURL: flattenedPath,
    date: date as unknown as string,
    tagsDetailed: tags?.map((tag) => ({ name: getTopicTitle(tag), slug: tag })),
  }

  return (
    <div className={twMerge("mt-4", className || "")}>
      <TranscriptDetailsCard key={id} slug={flattenedPath.split("/")} data={transcriptData} pillCountLimit={5} showSource={true} />
    </div>
  );
}; 

export default SearchResultCard