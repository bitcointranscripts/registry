import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTopics from "@/public/topics-counts.json";
import { deriveAlternateLanguages } from "@/utils";
import { LanguageCode } from "@/config";
import { Metadata } from "next";

const languageKeys = Object.keys(allTopics) as LanguageCode[];
const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: languageKeys,
  suffix: "topics",
});

export const metadata: Metadata = {
  title: "Topics",
  alternates: {
    canonical: "/topics",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: LanguageCode.en,
  },
};

const TopicsPage = () => {
  const languageCode = LanguageCode.en;
  const topics = (allTopics as any)[languageCode].data;

  return (
    <div className="flex flex-col  text-black">
      <TranscriptContentPage
        header="Topics"
        data={topics}
        description="Bitcoin is made up of an endless amount of topics, and there’s no shortage of rabbit holes to go down. "
        type="alphabet"
        linkName="tags"
        languageCode={languageCode}
      />
    </div>
  );
};

export default TopicsPage;
