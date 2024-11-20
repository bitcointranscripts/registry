import React from "react";
import { allTranscripts } from "contentlayer/generated";
import { LanguageCodes } from "@/config";
import { notFound } from "next/navigation";
import IndividualTranscript from "@/components/individual-transcript/IndividualTranscript";

// forces 404 for paths not generated from `generateStaticParams` function.
export const dynamicParams = false;

export function generateStaticParams() {
  const allSingleTranscriptPaths = allTranscripts.map((transcript) => {
    const slugForLanguage = transcript.languageURL.split("/").filter(path => Boolean(path.trim()));
    return {
      slug: slugForLanguage
    }
  });

  return allSingleTranscriptPaths;
}

const Page = ({ params }: { params: { slug: string[] } }) => {
  const slugArray = params.slug;
  const isNonEnglishLanguage = LanguageCodes.includes(slugArray[0]);
  let transcriptUrl = "";
  if (isNonEnglishLanguage) {
    const languageCode = slugArray.shift();
    slugArray[slugArray.length - 1] = slugArray[slugArray.length - 1] + `.${languageCode}`;
    transcriptUrl = `/${slugArray.join("/")}`;
  } else {
    transcriptUrl = `/${slugArray.join("/")}`;
  }

  const transcript = allTranscripts.find(transcript => transcript.url === transcriptUrl)

  if(!transcript) {
    return notFound();
  }
  return (
      <IndividualTranscript  transcript={transcript}/>
  );
};

export default Page;
