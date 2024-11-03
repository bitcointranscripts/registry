import React from "react";
import { allTranscripts } from "contentlayer/generated";
import { LanguageCodes } from "@/config";
import { notFound } from "next/navigation";
import IndividualTranscript from "@/components/individual-transcript/IndividualTranscript";

export function generateStaticParams() {

  const allSingleTranscriptPaths = allTranscripts.map((transcript) => {
    const isLanguageEnglish = transcript.language === "en";
    if (isLanguageEnglish) {
      return {
        slug: transcript.slugAsParams as string[],
      };
    }
    return {
      slug: [transcript.language, ...transcript.slugAsParams] as string[],
    };
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
    <div>
      <IndividualTranscript  transcript={transcript}/>
    </div>
  );
};

export default Page;
