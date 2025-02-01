import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allSources from "@/public/source-count-data.json";
import { Metadata } from "next";
import { LanguageCode, OtherSupportedLanguages } from "@/config";

const metadataLanguages = OtherSupportedLanguages.reduce((acc, language) => {
  const alternateUrl = language === "en" ? `/sources` : `/${language}/sources`;
  acc[language] = alternateUrl;
  return acc;
}, {} as Record<string, string>);

export const metadata: Metadata = {
  title: "Sources",
  alternates: {
    canonical: "/",
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages: OtherSupportedLanguages,
    language: "en",
  },
};

const SourcesPage = () => {
  const languageCode = LanguageCode.en;
  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="sources"
        data={allSources}
        type="alphabet"
        linkName="sources"
        languageCode={languageCode}
      />
    </div>
  );
};

export default SourcesPage;
