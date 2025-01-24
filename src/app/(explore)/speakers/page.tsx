import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allSpeakers from "@/public/speaker-data.json";
import { LanguageCode } from "@/config";
import { deriveAlternateLanguages } from "@/utils";
import { Metadata } from "next";

const languageKeys = Object.keys(allSpeakers) as LanguageCode[];
const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: languageKeys,
  suffix: "speakers",
});

export const metadata: Metadata = {
  title: "Speakers",
  alternates: {
    canonical: "/speakers",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: LanguageCode.en,
  },
};

const SpeakerPage = () => {
  const languageCode = LanguageCode.en;
  const speakers = (allSpeakers as any)[languageCode].data;

  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="speakers"
        data={speakers}
        type="alphabet"
        linkName="speakers"
        languageCode={languageCode}
      />
    </div>
  );
};

export default SpeakerPage;
