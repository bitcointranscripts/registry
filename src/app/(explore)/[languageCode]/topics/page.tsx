import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTopics from "@/public/topics-counts.json";
import { LanguageCode } from "@/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { deriveAlternateLanguages, getLangCode } from "@/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  const topicLanguageSlugs = Object.keys(allTopics).map((lang) => {
    return { languageCode: lang };
  });
  return topicLanguageSlugs;
}

export function generateMetadata({
  params,
}: {
  params: { languageCode: string };
}): Metadata {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const languageKeys = Object.keys(allTopics) as LanguageCode[];
  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
    languageCode,
    languages: languageKeys,
    suffix: "topics",
  });

  return {
    title: "Topics",
    alternates: {
      canonical: "/topics",
      languages: metadataLanguages, // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: languageCode,
    },
  };
}

const TopicsPage = ({ params }: { params: { languageCode: string } }) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const topics = (allTopics as any)[languageCode].data;

  return (
    <div className="flex flex-col  text-black">
      <TranscriptContentPage
        header="topics"
        data={topics}
        type="alphabet"
        linkName="tags"
        languageCode={languageCode}
      />
    </div>
  );
};

export default TopicsPage;
