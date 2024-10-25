import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentTreeArray } from "@/utils/data";
import allSources from "@/public/sources-data.json";
import { allSources as allContentSources } from "contentlayer/generated";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";
import { ContentTree, filterOutIndexes } from "@/utils";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import WorldIcon from "/public/svgs/world-icon.svg";
import Image from "next/image";

// forces 404 for paths not generated from `generateStaticParams` function.
export const dynamicParams = false;

export function generateStaticParams() {
  const allSlugs = allContentSources.map(({ slugAsParams, language }) => {
    if (language === "en") {
      return { slug: slugAsParams };
    } else {
      return { slug: [language, ...slugAsParams] };
    }
  });

  return allSlugs;
}

const page = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug ?? [];
  const contentTree = allSources;

  let current: any = contentTree;

  for (const part of slug) {
    if (typeof current === "object" && !Array.isArray(current) && part in current) {
      current = current[part] as ContentTree | ContentTreeArray[];
    } else {
      notFound();
    }
  }

  const displayCurrent = filterOutIndexes(current);

  const pageDetails = allContentSources.find((source) => {
    return source.slugAsParams[0] === slug[0] && source.language === "en";
  });

  const isDirectoryList = Array.isArray(current);

  return (
    <div className='flex items-start lg:gap-[50px]'>
      <div className='flex flex-col w-full gap-6 md:gap-8 2xl:gap-10 no-scrollbar'>
        <div
          className={`flex flex-col ${
            isDirectoryList ? "border-b border-b-[#9B9B9B] pb-6 md:border-b-0 md:pb-0" : "border-b border-b-[#9B9B9B] pb-6 lg:pb-10"
          } gap-5 2xl:gap-6`}
        >
          <BreadCrumbs />
          <div className='flex flex-col'>
            <Link href={`/${slug.slice(0, -1).join("/")}`} className='flex gap-1 items-center'>
              <ArrowLinkRight className='rotate-180 w-5 md:w-6' />
              <p>Back</p>
            </Link>

            <h3 className='text-xl 2xl:text-2xl font-medium pt-6 md:pt-3'>{pageDetails?.title ?? slug[slug.length - 1]}</h3>
            {isDirectoryList && pageDetails?.source ? (
              <div className='flex gap-1 items-center pt-6 md:pt-3'>
                <Image src={WorldIcon} alt='world icon' className='w-[18px] md:w-[20px]' />
                <Link
                  href={pageDetails?.source ?? ""}
                  target='_blank'
                  className='text-xs md:text-sm xl:text-base leading-[17.6px] font-medium text-black underline'
                >
                  {pageDetails.source ?? ""}
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        {isDirectoryList ? (
          <div className='flex flex-col gap-6 h-full pb-8 overflow-scroll'>
            {(displayCurrent as ContentTreeArray[]).map((item, i) => (
              <TranscriptDetailsCard key={i} slug={slug} data={item} />
            ))}
          </div>
        ) : (
          <div className='flex-col flex gap-10 overflow-scroll pb-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
              {(displayCurrent as string[]).map((key, i) => (
                <Link
                  key={`${key}-${i}}`}
                  href={`/${[...slug, key].join("/")}`}
                  className='flex capitalize cursor-pointer border max-w-[100%] border-gray-custom-1200 rounded-[5px] justify-between items-center text-sm py-5 px-4 lg:py-7 2xl:px-6 2xl:text-lg font-semibold text-gray-custom-1100'
                >
                  <span className='text-wrap break-words max-w-[80%]'>{key}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='hidden lg:flex sticky top-0 flex-shrink-0 w-fit lg:justify-center 2xl:min-w-[100px] xl:min-w-[200px]'></div>
    </div>
  );
};

export default page;
