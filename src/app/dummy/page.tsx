import React from "react";
import Wrapper from "@/components/layout/Wrapper";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import TranscriptMetadataComponent from "@/components/common/TranscriptMetadatCard";
import ContentSwitch from "@/components/common/ContentSwitch";

const page = () => {
  return (
    <div className='flex items-center justify-center w-full h-full max-h-[calc(100vh-var(--header-height))]'>
      <Wrapper className='h-[calc(100vh-var(--header-height))] w-full'>
        <div className='flex flex-col w-full h-full max-h-[calc(100vh-var(--header-height))]'>
          <section className='py-4 max-sm:pb-6 md:py-7 lg:py-8 2xl:py-10'>
            <BreadCrumbs />
          </section>

          <section className='flex justify-between w-full gap-5 overflow-hidden h-full'>
            <div className='h-full w-full md:w-[75%] overflow-scroll'>
              <div>
                <TranscriptMetadataComponent
                  title='Newsletter #292 Recap'
                  date={"7 March, 2004"}
                  topics={["Anonymity Networks", "Research"]}
                  speakers={["Gloria Zhao", "Tuedon Tuoyo"]}
                  transcriptBy={"Afolabi"}
                />
              </div>

              <div className='pt-3 md:pt-6 2xl:pt-8'>
                <div className='pt-4 md:pt-5 2xl:pt-6'>
                  <ContentSwitch />
                </div>
              </div>
            </div>

            <div className='hidden md:flex w-[25%] md:p-3 2xl:p-6 rounded-2xl max-h-[50%] border border-gray-custom-1200 min-h-[50%]'>
              <div className='overflow-scroll'>
                {/* body */}
                <p className='text-black text-sm md:text-sm 2xl:text-lg leading-[23.22px]'>{}</p>
              </div>
            </div>
          </section>
        </div>
      </Wrapper>
    </div>
  );
};

export default page;
