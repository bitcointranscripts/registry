import React from "react";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedTranscripts from "@/components/landing-page/featured-transcripts/FeaturedTranscripts";
import WhyTranscripts from "@/components/landing-page/WhyTranscripts";
import ExploreTranscripts from "@/components/landing-page/explore-transcripts/ExploreTranscripts";
import FooterComponent from "@/components/layout/FooterComponent";
import { LanguageCode, LanguageCodes } from "@/config";
import { deriveAlternateLanguages } from "@/utils";
import { Metadata } from "next";

const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: LanguageCodes,
  suffix: "",
});

export const metadata: Metadata = {
  alternates: {
    languages: metadataLanguages, // Add custom metadata for languages
  },
  other: {
    alternateLanguages,
    language: LanguageCode.en,
  },
};

export default function Home({languageCode = LanguageCode.en }: {languageCode?: LanguageCode}) {
  return (
    <div className='bg-white flex flex-col items-center justify-center'>
      <div className='w-full'>
        <HeroSection languageCode={languageCode} />
        <FeaturedTranscripts languageCode={languageCode} />
        <WhyTranscripts languageCode={languageCode} />
        <ExploreTranscripts languageCode={languageCode} />
        <FooterComponent languageCode={languageCode} />
      </div>
    </div>
  );
}
