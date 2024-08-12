import React from "react";
import { allTranscripts } from "contentlayer/generated";
import Link from "next/link";

import { organizeContent } from "@/utils";

export default function Home() {
  const contentTree = organizeContent(allTranscripts);

  return (
    <div>
      <h1>Bitcoin Transcripts</h1>
      <ul>
        {Object.keys(contentTree).map((key) => (
          <li key={key}>
            <Link href={`/${key}`}>{key}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
