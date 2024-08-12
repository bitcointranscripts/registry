import React from "react";
import { allTranscripts } from "contentlayer/generated";
import type { Transcript } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import { organizeContent, ContentTree } from "@/utils";

export function generateStaticParams() {
  return allTranscripts.map((transcript) => ({
    slug: transcript.slugAsParams,
  }));
}

export default function SlugPage({ params }: { params: { slug: string[] } }) {
  const slug = params?.slug || [];
  const contentTree = organizeContent(allTranscripts);

  let current: ContentTree | Transcript[] = contentTree;

  for (const part of slug) {
    if (
      typeof current === "object" &&
      !Array.isArray(current) &&
      part in current
    ) {
      current = current[part] as ContentTree | Transcript[];
    } else {
      notFound();
    }
  }

  if (Array.isArray(current)) {
    // We're at a leaf node (transcript)
    const transcript = current[0];
    return (
      <article>
        <h1>{transcript.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: transcript.body.html }} />
        <Link href={`/${slug.slice(0, -1).join("/")}`}>Back</Link>
      </article>
    );
  } else {
    // We're at a directory
    return (
      <div>
        <h1>{slug[slug.length - 1] || "Root"}</h1>
        <ul>
          {Object.keys(current).map((key) => (
            <li key={key}>
              <Link href={`/${[...slug, key].join("/")}`}>{key}</Link>
            </li>
          ))}
        </ul>
        {slug.length > 0 && (
          <Link href={`/${slug.slice(0, -1).join("/")}`}>Back</Link>
        )}
      </div>
    );
  }
}
