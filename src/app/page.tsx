import React from "react";
import { allTranscripts } from "contentlayer/generated";

import { organizeContent } from "@/utils";
import { HeroSection, Header, FeaturedTranscripts, ExploreTranscripts, FooterTop, WhyTranscripts, FooterComponent } from "./components/index";

export default function Home() {
  const contentTree = organizeContent(allTranscripts);

  return (
    <div className='bg-white flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1920px]'>
        <Header />
        <HeroSection />
        <FeaturedTranscripts />
        <WhyTranscripts />
        <ExploreTranscripts />
        <FooterTop />
        <FooterComponent />
      </div>
    </div>
  );
}
