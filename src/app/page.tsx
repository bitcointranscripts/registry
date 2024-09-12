import React from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedTranscripts from "@/components/landing-page/featured-transcripts/FeaturedTranscripts";
import WhyTranscripts from "@/components/landing-page/WhyTranscripts";
import ExploreTranscripts from "@/components/landing-page/explore-transcripts/ExploreTranscripts";
import FooterComponent from "@/components/layout/FooterComponent";

export default function Home() {
  return (
    <div className='bg-white flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1920px]'>
        <Header />
        <HeroSection />
        <FeaturedTranscripts />
        <WhyTranscripts />
        <ExploreTranscripts />
        <FooterComponent />
      </div>
    </div>
  );
}
