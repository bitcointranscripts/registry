import React from "react";
import ErrorPageSkeleton from "./ErrorPageSkeleton";

const NoSearchResult = () => {
  return (
    <ErrorPageSkeleton>
      <section className='text-center max-w-[424px]'>
        <h1 className='text-[40px] leading-[54.62px] 2xl:text-[56px] 2xl:leading-[76.5px] xl:text-5xl xl:leading-[60px] font-extrabold text-center'>
          No Search Results Found
        </h1>
        <section className='flex items-center justify-center text-sm font-medium md:text-base md:font-semibold 2xl:text-lg 2xl:font-semibold text-center pt-2'>
          <p className='max-w-[258px] sm:max-w-full'>Help us review transcripts to make sure this never happens again!</p>
        </section>
      </section>
    </ErrorPageSkeleton>
  );
};

export default NoSearchResult;
