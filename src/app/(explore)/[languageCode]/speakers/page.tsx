import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allSpeakers from "@/public/speaker-data.json";
import { LanguageCode } from "@/config";
import { deriveAlternateLanguages, getLangCode } from "@/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  const speakerLanguageSlugs = Object.keys(allSpeakers).map((lang) => {
    return { languageCode: lang };
  });
  return speakerLanguageSlugs;
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

  const languageKeys = Object.keys(allSpeakers) as LanguageCode[];
  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
    languageCode,
    languages: languageKeys,
    suffix: "speakers",
  });

  return {
    title: "Speakers",
    alternates: {
      canonical: "/speakers",
      languages: metadataLanguages, // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: languageCode,
    },
  };
}

const SpeakerPage = ({ params }: { params: { languageCode: string } }) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }
  
  const speakers = (allSpeakers as any)[languageCode].data;

  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="Speakers"
        data={speakers}
        description="Discover insights from key figures of the Bitcoin community."
        type="alphabet"
        linkName="speakers"
        languageCode={languageCode}
      />
    </div>
  );
};

export default SpeakerPage;
