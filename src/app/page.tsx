import React from "react";
import { allTranscripts } from "contentlayer/generated";

import { organizeContent } from "@/utils";
import { HeroSection, Header, FeaturedTranscripts, ExploreTranscripts, FooterTop, WhyTranscripts, FooterComponent } from "./components/index";

export default function Home() {
  const contentTree = organizeContent(allTranscripts);

  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturedTranscripts />
      <WhyTranscripts />
      <ExploreTranscripts />
      <FooterTop />
      <FooterComponent />
    </div>
  );
}
