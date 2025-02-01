import React from "react";
import { LanguageCode, OtherSupportedLanguages } from "@/config";
import { deriveAlternateLanguages } from "@/utils";
import { Metadata } from "next";
import About from "./about";

const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
  languageCode: LanguageCode.en,
  languages: OtherSupportedLanguages,
  suffix: "about",
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

const AboutPage = () => {
  return (<About languageCode={LanguageCode.en} />);
};

export default AboutPage;