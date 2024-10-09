import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentTreeArray } from "@/utils/data";
import allSources from "@/public/sources-data.json";
import { allTranscripts } from "contentlayer/generated";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";
import { ContentTree, extractDirectoryData, filterOutIndexes } from "@/utils";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";

export function generateStaticParams() {
  return allTranscripts.reduce((acc, { _raw: { flattenedPath }, slugAsParams }) => {
    const params = flattenedPath.split("/");

    if (!params[params.length - 1].includes("index")) {
      acc.push({ slug: slugAsParams });
    }

    return acc;
  }, [] as { slug: string }[]);
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

  const { directoryData } = extractDirectoryData(current);

  const isDirectoryList = Array.isArray(current);

  return (
    <div className='flex items-start relative lg:gap-[50px]'>
      <div className='flex flex-col w-full gap-6 lg:gap-10 no-scrollbar'>
        <div
          className={`flex flex-col ${
            isDirectoryList ? "border-b border-b-[#9B9B9B] pb-6 md:border-b-0 md:pb-0" : "border-b border-b-[#9B9B9B] pb-6 lg:pb-10"
          } gap-6`}
        >
          <BreadCrumbs />
          <div className='flex flex-col'>
            <Link href={`/sources/${slug.slice(0, -1).join("/")}`} className='flex gap-1 items-center'>
              <ArrowLinkRight className='rotate-180 w-5 md:w-6' />
              <p>Back</p>
            </Link>

            <h3 className='text-xl 2xl:text-2xl font-medium pt-6 md:pt-3'>
              {current["_index"] ? current["_index"][0].title : isDirectoryList ? directoryData?.title : slug[slug.length - 1]}
            </h3>
          </div>
        </div>

        {isDirectoryList ? (
          <div className='flex flex-col gap-6 overflow-scroll pb-[calc(90vh-var(--header-height))]'>
            {(displayCurrent as ContentTreeArray[]).map((item, i) => (
              <TranscriptDetailsCard key={i} slug={slug} data={item} />
            ))}
          </div>
        ) : (
          <div className='flex-col flex gap-10 pb-[calc(90vh-var(--header-height))]'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
              {(displayCurrent as string[]).map((key, i) => (
                <Link
                  key={`${key}-${i}}`}
                  href={`/sources/${[...slug, key].join("/")}`}
                  className='flex capitalize cursor-pointer border max-w-[100%] border-gray-custom-1200 rounded-[5px] justify-between items-center text-sm py-5 px-4 lg:py-7 2xl:px-6 2xl:text-lg font-semibold text-gray-custom-1100'
                >
                  <span className='text-wrap break-words max-w-[80%]'>{key}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='hidden lg:flex sticky top-0 flex-shrink-0 w-fit lg:justify-center xl:min-w-[200px]'></div>
    </div>
  );
};

export default page;
