import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo, Wrapper } from ".";
import { menuApps } from "@/utils/data";

const FooterTop = () => {
  return (
    <Wrapper className='pt-16 pb-20 flex justify-between max-md:flex-col max-md:px-6 max-md:gap-8 max-md:pt-6 max-md:pb-8'>
      <section className='flex justify-between w-[50%] gap-8 max-md:flex-col max-md:w-full'>
        <section className='flex flex-col gap-6 max-w-[400px] max-md:gap-4 max-md:max-w-full max-md:w-full'>
          <Logo iconStyles='w-14 max-xl:w-[45px]' textStyles='text-5xl text-black max-xl:text-[32px]' />
          <p className='font-medium sm:text-sm md:text-base xl:text-lg text-gray-custom-800 max-xl:text-base max-md:text-sm'>
            Community-maintained archive to unlocking knowledge from technical bitcoin transcripts
          </p>
        </section>
        <section className='flex flex-col gap-12 text-black font-bold text-xl underline max-xl:text-base max-xl:gap-8 max-md:gap-4'>
          <Link href='https://btctranscripts.com/' target='_blank'>
            Transcripts
          </Link>
          <Link href='/About' className='hidden'>
            About
          </Link>
        </section>
      </section>

      <section className='flex flex-col gap-6 max-md:gap-4'>
        <h4 className='text-black text-xl max-md:text-base'>Explore all Products</h4>
        <section className='flex max-w-[400px] gap-12 flex-wrap max-xl:gap-6 max-md:max-w-full max-lg:gap-4'>
          {menuApps.slice(1).map(({ href, image, alt }) => (
            <Link href={href} target='_blank' rel='noopener noreferrer' key={alt}>
              <Image
                className={`rounded-xl w-[54px] h-[54px] lg:w-16 lg:h-16 border border-gray-custom-200 ${
                  alt === "Bitcoin search" || alt === "Bitcoin TLDR" ? "border border-gray-custom-200" : ""
                }`}
                src={image}
                alt={alt}
                width={88}
                height={88}
              />
            </Link>
          ))}
        </section>
      </section>
    </Wrapper>
  );
};

export default FooterTop;
