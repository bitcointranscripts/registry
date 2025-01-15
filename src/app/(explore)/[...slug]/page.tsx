import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContentTreeArray } from "@/utils/data";
import LinkIcon from "/public/svgs/link-icon.svg";
import WorldIcon from "/public/svgs/world-icon.svg";
import allSources from "@/public/sources-data.json";
import { constructSlugPaths, deriveSourcesList, fetchTranscriptDetails, loopArrOrObject } from "@/utils";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";
import { allSources as allContentSources, allTranscripts } from "contentlayer/generated";
import TranscriptDetailsCard from "@/components/common/TranscriptDetailsCard";
import { SourcesBreadCrumbs } from "@/components/explore/SourcesBreadCrumbs";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import { LanguageCodes } from "@/config";

// forces 404 for paths not generated from `generateStaticParams` function.
export const dynamicParams = false;

export function generateStaticParams() {
  const languageSlugs = LanguageCodes.map((lang) => ({ slug: [lang, "sources"] }));

  const allSlugs = allContentSources.map(({ language, slugAsParams }) => {
    const isEnglish = language === "en";
    if (isEnglish) {
      return {
        slug: slugAsParams,
      };
    }
    return {
      slug: [language, ...slugAsParams],
    };
  });

  const combineSlugs = [...languageSlugs, ...allSlugs];

  return combineSlugs;
}

const page = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug ?? [];
  const contentTree = allSources;
  const { slugPaths } = constructSlugPaths(slug);
  let current: any = contentTree;
  let currentLanguageSource: any = allSources;
  let languageTreeArray: { slug: string; name: string; count: number }[] = [];

  const isRouteForLanguage = slug.length === 2 && LanguageCodes.includes(slug[0]) && slug[1] === "sources";

  if (isRouteForLanguage) {
    const language = slug[0];
    const sourcesAndLanguage = Object.keys(allSources);
    const languageTree: any = {};

    sourcesAndLanguage.forEach((source) => {
      const getSource = currentLanguageSource[source];
      if (getSource[language]) {
        languageTree[source] = getSource[language];
      }
    });

    languageTreeArray = deriveSourcesList(languageTree);

    return (
      <div className='flex flex-col text-black'>
        <TranscriptContentPage
          header='Sources'
          data={languageTreeArray}
          description='Sources help you find transcripts within a specific talk, meetup, conference, and the likes.'
          type='alphabet'
          linkName={language}
        />
      </div>
    );
  } else {
    for (const part of slugPaths) {
      if (typeof current === "object" && !Array.isArray(current) && part in current) {
        current = current[part];
      } else {
        notFound();
      }
    }

    const metadata = current.metadata;
    const data = loopArrOrObject(current?.data);
    const isRoot = Array.isArray(current.data);
    const { transcripts } = fetchTranscriptDetails(allTranscripts, data, isRoot);

    return (
      <div className='flex items-start lg:gap-[50px]'>
        <div className='flex flex-col w-full gap-6 md:gap-8 2xl:gap-10 no-scrollbar'>
          <div
            className={`flex flex-col ${
              isRoot ? "border-b border-b-[#9B9B9B] pb-6 md:border-b-0 md:pb-0" : "border-b border-b-[#9B9B9B] pb-6 lg:pb-10"
            } gap-5 2xl:gap-6`}
          >
            <>
              <SourcesBreadCrumbs slugPaths={slugPaths} current={contentTree} />
            </>
            <div className='flex flex-col'>
              <Link href={slug.slice(0, -1).join("/") === "" ? `/sources` : `/${slug.slice(0, -1).join("/")}`} className='flex gap-1 items-center'>
                <ArrowLinkRight className='rotate-180 w-5 md:w-6' />
                <p>Back</p>
              </Link>

              <h3 className='text-xl 2xl:text-2xl font-medium pt-6 md:pt-3'>{metadata?.title ?? slug[slug.length - 1]}</h3>
              {isRoot && metadata?.website ? (
                <div className='flex gap-1 items-center pt-3 md:pt-6'>
                  <Image src={WorldIcon} alt='world icon' className='w-[18px] md:w-[20px]' />
                  <Link
                    href={metadata?.website ?? ""}
                    target='_blank'
                    className='text-xs md:text-sm xl:text-base leading-[17.6px] font-medium text-black underline text-wrap break-words line-clamp-1'
                  >
                    {metadata.website ?? ""}
                  </Link>
                </div>
              ) : null}

              {isRoot && metadata?.additional_resources ? (
                <div className='flex gap-1 items-center pt-3 md:pt-6'>
                  <Image src={LinkIcon} alt='link icon' className='w-[18px] md:w-[20px]' />
                  <div className='flex gap-1 flex-wrap'>
                    {metadata.additional_resources.map((resource: any, index: number) => (
                      <Link
                        href={resource.url ?? ""}
                        key={`${resource.title}-${index}`}
                        target='_blank'
                        className='py-[2px] px-4 rounded-[5px] bg-custom-white text-base leading-[21.86px] font-medium max-md:px-3 lg:py-1 max-2xl:text-sm max-md:text-sm border border-gray-custom-1500 max-md:leading-[100%] cursor-pointer'
                      >
                        {resource.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {isRoot ? (
            <div className='flex flex-col gap-6 h-full pb-8 overflow-scroll'>
              {(transcripts as ContentTreeArray[]).map((item, i) => (
                // without suspense, page deopts into CSR due to useSearchParams hook in component
                <Suspense fallback={<></>}>
                  <TranscriptDetailsCard key={i} slug={slug} data={item} />
                </Suspense>
              ))}
            </div>
          ) : (
            <div className='flex-col flex gap-10 overflow-scroll pb-8'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 '>
                {(data as any[]).map((value, i) => (
                  <Link
                    key={`${value.route}-${i}}`}
                    href={`/${[...slug, value.route].join("/")}`}
                    className='flex capitalize cursor-pointer border max-w-[100%] border-gray-custom-1200 rounded-[5px] justify-between items-center text-sm py-5 px-4 lg:py-7 2xl:px-6 2xl:text-lg font-semibold text-gray-custom-1100'
                  >
                    <span className='text-wrap break-words max-w-[80%]'>{value.title}</span>
                    <span>{value.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='hidden lg:flex sticky top-0 flex-shrink-0 w-fit lg:justify-center 2xl:min-w-[100px] xl:min-w-[200px]'></div>
      </div>
    );
  }
};

export default page;
