import React from "react";
import { LanguageCodes } from "@/config";
import { deriveAlternateLanguages, getLangCode } from "@/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "@/app/about/about";

export const dynamicParams = false;

const languageKeys = LanguageCodes;

export function generateStaticParams() {
  const searchLanguageKeys = languageKeys.map((lang) => {
    return { languageCode: lang };
  });
  return searchLanguageKeys;
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

  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
    languageCode,
    languages: languageKeys,
    suffix: "about",
  });

  return {
    alternates: {
      languages: metadataLanguages, // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: languageCode,
    },
  };
}

const DynamicAboutPage = ({ params }: { params: { languageCode: string } }) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  return (<About languageCode={languageCode} />)
};

export default DynamicAboutPage
