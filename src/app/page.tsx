import React from "react";
import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedTranscripts from "@/components/landing-page/featured-transcripts/FeaturedTranscripts";
import WhyTranscripts from "@/components/landing-page/WhyTranscripts";
import ExploreTranscripts from "@/components/landing-page/explore-transcripts/ExploreTranscripts";
import FooterComponent from "@/components/layout/FooterComponent";

export default function Home() {
  return (
    <div className='bg-white dark:bg-dark-custom-100 flex flex-col items-center justify-center'>
      <div className='w-full'>
        <HeroSection />
        <FeaturedTranscripts />
        <WhyTranscripts />
        <ExploreTranscripts />
        <FooterComponent />
      </div>
    </div>
  );
}
