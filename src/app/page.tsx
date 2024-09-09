import React from "react";
import { HeroSection, Header, FeaturedTranscripts, ExploreTranscripts, FooterTop, WhyTranscripts, FooterComponent } from "./components";

export default function Home() {
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
