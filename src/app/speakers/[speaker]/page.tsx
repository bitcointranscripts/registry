import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { allTranscripts } from "contentlayer/generated";
import { getSpeakerData } from "@/utils";

// Generates the paths for static generation
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "speaker-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const speakerData = JSON.parse(fileContents);

  return Object.keys(speakerData).map((slug) => ({
    speaker: slug,
  }));
}

export default async function SpeakerPage({
  params,
}: {
  params: { speaker: string };
}) {
  const { speaker } = params;

  // Get the speaker's full name and count from the JSON file
  console.log(speaker);
  const speakerInfo = getSpeakerData(speaker);

  if (!speakerInfo) {
    return <div>Speaker not found</div>;
  }

  // Find transcripts where the speaker is mentioned
  const transcripts = allTranscripts
    .filter((transcript) =>
      transcript.speakers?.some((s) => s === speakerInfo.fullName)
    )
    .map(({ title, url }) => ({
      title,
      url,
    }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Transcripts featuring "{speakerInfo.fullName}"
      </h1>
      <ul className="list-disc pl-5 space-y-2">
        {transcripts.map((transcript) => (
          <li key={transcript.url}>
            <Link
              className="text-blue-500 hover:underline"
              href={transcript.url}
            >
              {transcript.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
