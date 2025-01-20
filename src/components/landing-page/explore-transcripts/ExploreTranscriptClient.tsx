"use client";

import React from "react";
import Link from "next/link";
import { Carousel } from "@bitcoin-dev-project/bdp-ui";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";
import { ExploreTranscriptCard } from "../TranscriptCard";
import { countItemsAndSort } from "@/utils";

interface TagInfo {
  name: string;
  slug: string;
  count: number;
}

interface ExploreTranscriptClientProps {
  categories: { [category: string]: TagInfo[] };
  types: { [category: string]: TagInfo[] };
}

const ExploreTranscriptClient = ({ categories, types }: ExploreTranscriptClientProps) => {
  const sortedCategories = countItemsAndSort(categories);
  const sortedTypes = countItemsAndSort(types);

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='flex items-start flex-col gap-14 w-full max-md:gap-10 max-w-[1920px]'>
        <section className='flex flex-col gap-6 w-full'>
          <section className='flex items-center gap-4 w-full'>
            <h3 className='text-2xl font-semibold max-md:text-xl'>Categories</h3>
            <Link href='/categories' className='w-fit px-5 py-[6px] rounded-full border border-black dark:border-gray-custom-100 flex gap-1 items-center max-md:py-1 max-md:px-3'>
              <p className='leading-[19.2px] text-sm font-medium'>View All</p>
              <ArrowLinkRight className='text-black w-6 max-md:w-5 dark:text-gray-custom-100' />
            </Link>
          </section>
          <Carousel config={{ stepWidthInPercent: 40 }}>
            <Carousel.Container>
              {Object.entries(sortedCategories).map(([key, value]) => (
                <Carousel.Item key={key}>
                  <ExploreTranscriptCard title={key} transcripts={value} url={key} key={key} type='CATEGORY' />
                </Carousel.Item>
              ))}
            </Carousel.Container>
            <Carousel.Controls>
              <Carousel.PreviousButton icon={<ArrowLinkRight className={`text-black w-6 max-md:w-5 rotate-180 absolute`} />} />
              <Carousel.NextButton icon={<ArrowLinkRight className={`text-black w-6 max-md:w-5`} />} />
            </Carousel.Controls>
          </Carousel>
        </section>

        <section className='flex flex-col gap-6 w-full'>
          <section className='flex items-center gap-4 w-full'>
            <h3 className='text-2xl font-semibold max-md:text-xl'>Types</h3>
            <Link href='/types' className='w-fit px-5 py-[6px] rounded-full border border-black
             dark:border-gray-custom-1800 flex gap-1 items-center max-md:py-1 max-md:px-3 '>
              <p className='leading-[19.2px] text-sm font-medium'>View All</p>
              <span>
                <ArrowLinkRight className='text-black w-6 max-md:w-5' />
              </span>
            </Link>
          </section>
          <Carousel config={{ stepWidthInPercent: 40 }}>
            <Carousel.Container>
              {Object.entries(sortedTypes).map(([key, value]) => (
                <Carousel.Item key={key}>
                  <ExploreTranscriptCard title={key} url={key} transcripts={value} key={key} type='TYPE' />
                </Carousel.Item>
              ))}
            </Carousel.Container>
            <Carousel.Controls>
              <Carousel.PreviousButton icon={<ArrowLinkRight className={`text-black w-6 max-md:w-5 rotate-180 absolute`} />} />
              <Carousel.NextButton icon={<ArrowLinkRight className={`text-black w-6 max-md:w-5 `} />} />
            </Carousel.Controls>
          </Carousel>
        </section>
      </div>
    </div>
  );
};

export default ExploreTranscriptClient;
