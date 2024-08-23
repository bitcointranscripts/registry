import React from "react";
import Link from "next/link";
import { getSpeakers } from "@/utils";

interface SpeakerInfo {
  fullName: string;
  count: number;
  slug: string;
}

export default function SpeakersPage() {
  const speakerData = getSpeakers();

  // Create the speakers array using the precomputed data
  const speakers: SpeakerInfo[] = Object.entries(speakerData)
    .map(([slug, data]) => ({
      fullName: data.fullName,
      count: data.count,
      slug, // Slug is already the key in speakerData
    }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Speakers</h1>
      <p className="mb-4">
        {speakers.length} unique speakers across{" "}
        {speakers.reduce((a, b) => a + b.count, 0)} transcripts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {speakers.map((speaker) => (
          <Link
            key={speaker.slug}
            href={`/speakers/${speaker.slug}`}
            className="flex justify-between items-center p-2 bg-gray-100 border border-gray-300 rounded"
          >
            <span>{speaker.fullName}</span>
            <span>{speaker.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
