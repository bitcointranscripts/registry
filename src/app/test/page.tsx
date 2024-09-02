"use client";

import TranscriptBioData from "@/app/components/transcript-single/TranscriptBioData";
import React from "react";

const TestComponent = () => {
  return (
    <div className="max-w-[1280px] w-full p-4">
      <TranscriptBioData
        title="Newsletter #292 Recap"
        date={"7 March, 2004"}
        topics={["Anonymity Networks", "Research"]}
        speakers={["Gloria Zhao", "Tuedon Tuoyo"]}
        transcriptBy={"Afolabi"}
      />
    </div>
  );
};

export default TestComponent;
