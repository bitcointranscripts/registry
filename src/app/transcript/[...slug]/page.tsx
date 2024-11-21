import React from "react";
import { allTranscripts } from "contentlayer/generated";
import allSources from "@/public/sources-data.json";
import { notFound } from "next/navigation";
import IndividualTranscript from "@/components/individual-transcript/IndividualTranscript";
import { createSlug } from "@/utils";

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

const Page = ({ params }: { params: { slug: string[] } }) => {
  const slugArray = params.slug;
  let transcriptUrl = `/${slugArray.join("/")}`;

  const transcript = allTranscripts.find(
    (transcript) => transcript.languageURL === transcriptUrl
  );

  if (!transcript) {
    return notFound();
  }

  let data: any = allSources;
console.log(transcript.language,transcript.title)
  const breadCrumbRoutes = transcript.slugAsParams.map(
    (crumb: string, index: number) => {
      let title = "";
      const languageNumber = transcript.slugAsParams.length - (index + 1);
      data = data[crumb as keyof typeof allSources];
      if (index === 0) {
        title = data[transcript.language]?.metadata.title;
        data = data[transcript.language]?.data;
      } else if (index === transcript.slugAsParams.length - 1) {
        title = transcript.title;
      } else {
        title = data?.metadata.title;
        data = data?.data;
      }

      return {
        name: title,
        link: transcript.languageURL
          .split("/")
          .slice(0, languageNumber === 0 ? undefined : -languageNumber)
          .join("/"),
        isActive: index === transcript.slugAsParams.length - 1,
      };
    }
  );

  return (
    <IndividualTranscript
      breadCrumbs={[...breadCrumbRoutes]}
      transcript={transcript}
    />
  );
};

export default Page;
