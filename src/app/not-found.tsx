import React from "react";
import ErrorPageSkeleton from "@/components/common/ErrorPageSkeleton";

export default function NotFound({ searchPage }: { searchPage?: boolean }) {
  return (
    <ErrorPageSkeleton>
      <section className='text-center'>
      {searchPage ? (
          <h1 className="text-[40px] leading-[54.62px] 2xl:text-[56px] 2xl:leading-[76.5px] xl:text-5xl xl:leading-[60px] font-extrabold text-center">
            No search <br /> results found
          </h1>
        ) : (
          <h1 className="text-[40px] leading-[54.62px] 2xl:text-[56px] 2xl:leading-[76.5px] xl:text-5xl xl:leading-[60px] font-extrabold text-center">
            404
          </h1>
        )}
        <section className="flex flex-col gap-2 sm:gap-4 text-sm font-medium md:text-base md:font-semibold 2xl:text-lg 2xl:font-semibold text-center pt-2">
          {!searchPage && <p>Page not found</p>}
          <p className="">
            But maybe we found a new Transcript Reviewer?{" "}
            <span className="sm:hidden whitespace-nowrap">(we mean you!)</span>
            <br />
            <span className='hidden sm:flex text-center items-center justify-center'>(We mean you!)</span>
            <span className="hidden sm:flex text-center items-center justify-center">
              (We mean you!)
            </span>
          </p>
        </section>
      </section>
    </ErrorPageSkeleton>
  );
}
