import React from "react";
import { allTranscripts } from "contentlayer/generated";
import allSources from "@/public/sources-data.json";
import { notFound } from "next/navigation";
import IndividualTranscript from "@/components/individual-transcript/IndividualTranscript";

import { BaseCrumbType } from "@/components/common/BaseCrumbLists";
import { findAlternateLanguageForTranscript } from "@/utils/sources";
import { LanguageCode } from "@/config";
import { Metadata } from "next";
import { previewImageDimensions } from "@/utils/data";

// forces 404 for paths not generated from `generateStaticParams` function.
export const dynamicParams = false;

export function generateStaticParams() {
  const allSingleTranscriptPaths = allTranscripts.map((transcript) => {
    const slugForLanguage = transcript.languageURL
      .split("/")
      .filter((path) => Boolean(path.trim()));
    return {
      slug: slugForLanguage,
    };
  });
  return allSingleTranscriptPaths;
}

export const generateMetadata = async ({params}: { params: { slug: string[] } }): Promise<Metadata> => {

  const slugArray = params.slug;
  let transcriptUrl = `/${slugArray.join("/")}`;

  const transcript = allTranscripts.find(
    (transcript) => transcript.languageURL === transcriptUrl
  );

  if (!transcript) {
    return notFound();
  }

  const {slugAsParams: slug, language} = transcript

  const alternateLanguages = findAlternateLanguageForTranscript(slug, (language as LanguageCode), allSources)

  const metadataLanguages = alternateLanguages.reduce((acc, language) => {
    const alternateUrl = language === LanguageCode.en ? `/${slug.join("/")}` : `/${language}/${slug.join("/")}`;
    acc[language] = alternateUrl;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: transcript.title,
    description:transcript?.summary,
    alternates: {
      canonical: "/",
      languages: metadataLanguages // Add custom metadata for languages
    },
    other: {
      alternateLanguages,
      language: transcript.language
    },
    openGraph:{
      title: transcript.title,
      description:transcript?.summary,
      images:[{
        url:`/api/opengraph-image/transcript/${transcript?.url}`,
        width: previewImageDimensions.width,
        height: previewImageDimensions.height,
        alt: `${transcript?.title} OG Image`
      }]
    },
    twitter:{
      title: transcript.title,
      description:transcript?.summary,
      images:[{
        url:`/api/opengraph-image/transcript/${transcript?.url}`,
        width: previewImageDimensions.width,
        height: previewImageDimensions.height,
        alt: `${transcript?.title} OG Image`
      }]
    }
  };
};

const Page = ({ params }: { params: { slug: string[] } }) => {
  const slugArray = params.slug;
  let transcriptUrl = `/${slugArray.join("/")}`;

  const transcript = allTranscripts.find(
    (transcript) => transcript.languageURL === transcriptUrl
  );

  if (!transcript) {
    return notFound();
  }

  let sourcesData: any = allSources;

  // This  function returns an array of breadcrumb which we use to display navigation
  const breadcrumbRoutes:BaseCrumbType[] = transcript.slugAsParams.map(
    (crumb: string, index: number) => {
      let title = "";
      const languageNumber = transcript.slugAsParams.length - (index + 1);
      const link = transcript.languageURL
      .split("/")
      .slice(0, languageNumber === 0 ? undefined : -languageNumber)
      .join("/");

      // Needed to update the object when we go down the tree
      sourcesData = sourcesData[crumb as keyof typeof allSources];
      // Checks if the index is 0 so we can update the title and the data to the new sourcesData
      if (index === 0) {
        title = sourcesData[transcript.language]?.metadata.title;
        sourcesData = sourcesData[transcript.language]?.data;
      }
      // Checks if it's the last item in the map and updates the title to the transcripts title
      else if (index === transcript.slugAsParams.length - 1) {
        title = transcript.title;
      }
      // if it's neither the last or the first update the title and sourcesData
      else {
        title = sourcesData?.metadata.title;
        sourcesData = sourcesData?.data;
      }

      return {
        name: title,
        link,
        isActive: index === transcript.slugAsParams.length - 1,
      };
    }
  );

  return (
    <IndividualTranscript
      breadCrumbs={[...breadcrumbRoutes]}
      transcript={transcript}
    />
  );
};

export default Page;
