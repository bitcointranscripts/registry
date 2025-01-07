"use client";

import React from "react";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import { ContentTreeArray } from "@/utils/data";
import { EsSearchResult } from "@/app/search/types";
import { unsluggify } from "@/utils";

type Result = EsSearchResult["_source"];

export const SearchResultCard = ({ result }: { result: Result }) => {
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
    tagsDetailed: tags.map((tag) => ({ name: unsluggify(tag), slug: tag })),
  }

  return (
    <div className="md:pb-4">
      <TranscriptDetailsCard key={id} slug={flattenedPath.split("/")} data={transcriptData} />
    </div>
  );
}; 

export default SearchResultCard