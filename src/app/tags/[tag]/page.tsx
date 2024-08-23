import React from "react";
import Link from "next/link";
import { allTranscripts } from "contentlayer/generated";

export async function generateStaticParams() {
  const tags = Array.from(
    new Set(allTranscripts.flatMap((transcript) => transcript.tags))
  );

  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const transcripts = allTranscripts
    .filter((transcript) => transcript.tags?.includes(tag))
    .map(({ title, url }) => ({ title, url }));

  return (
    <div>
      <h1>Transcripts tagged with "{tag}"</h1>
      <ul>
        {transcripts.map((transcript) => (
          <li key={transcript.url}>
            <Link href={transcript.url}>{transcript.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
