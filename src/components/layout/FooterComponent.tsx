"use client";

import React from "react";
import { Footer } from "@bitcoin-dev-project/bdp-ui";
import Link from "next/link";
import { menuApps } from "@/utils/data";
import Image from "next/image";
import Wrapper from "./Wrapper";
import Logo from "./Logo";

const FooterComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <Wrapper className='pt-16 pb-20 gap-6 flex justify-between max-md:flex-col max-md:px-6 max-md:gap-8 max-md:pt-6 max-md:pb-8 w-full'>
        <section className='flex justify-between w-[50%] gap-8 max-md:flex-col max-md:w-full'>
          <section className='flex flex-col gap-6 max-w-[400px] max-md:gap-4 max-md:max-w-full max-md:w-full'>
            <Logo iconStyles='w-14 max-xl:w-[45px]' textStyles='text-5xl text-black max-xl:text-[32px]' />
            <p className='font-medium sm:text-sm md:text-base xl:text-lg text-gray-custom-800 dark:text-black max-xl:text-base max-md:text-sm'>
              Community-maintained archive to unlocking knowledge from technical bitcoin transcripts
            </p>
          </section>
          <section className='flex flex-col gap-12 text-black font-bold text-xl underline max-xl:text-base max-xl:gap-8 max-md:gap-4'>
            <Link href='/categories'>Transcripts</Link>
            <Link href='/about' className=''>
              About
            </Link>
          </section>
        </section>

        <section className='flex flex-col gap-6 max-md:gap-4'>
          <h4 className='text-black text-xl max-md:text-base '>Explore all Products</h4>
          <section className='flex max-w-[400px] gap-6 flex-wrap max-xl:gap-6 max-md:max-w-full max-lg:gap-4'>
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

      <div className='border-b-[0.5px] border-b-gray-custom-400 dark:border-b-gray-custom-2400 max-md:mx-6 w-full'></div>
      <Wrapper className='py-10 max-md:pt-8 max-md:pb-[67px] max-lg:px-2 w-full'>
        <Footer className="dark:bg-dark-custom-100 dark:text-gray-custom-100">
          <Footer.Socials
            platforms={[
              {
                entity: "github",
                entityLink: "https://github.com/bitcointranscripts/registry",
                iconProps: {
                  className: "hover:text-orange-400 dark:border-none",
                },
              },
              {
                entity: "discord",
                entityLink: "https://discord.gg/EAy9XMufbY",
                iconProps: {
                  className: "hover:text-orange-400 dark:border-none",
                },
              },
              {
                entity: "twitter",
                entityLink: "https://x.com/Bitcoin_Devs",
                iconProps: {
                  className: "hover:text-orange-400 dark:border-none",
                },
              },
              {
                entity: "nostr",
                entityLink: "https://njump.me/npub10p33xu03t8q7d9nxtks63dq4gmt4v4d3ppd5lcdp4rg9hxsd0f8q7mn2l2",
                iconProps: {
                  className: "hover:text-orange-400 dark:border-none",
                  stroke:"dark:green-custom-100"
                },
              },
            ]}
          />
          <Footer.About entityLink='https://bitcoindevs.xyz' entityName='Bitcoin Dev Project' className="dark:text-black" />
          <Footer.Public dashboardLink='https://visits.bitcoindevs.xyz/share/7hL0ysupLrZQsKRw/btc-transcripts' className="dark:text-black" />
          <Footer.Feedback feedbackLink='https://cryptpad.fr/form/#/2/form/view/3P2CsohsHOkcH7C+WdtX0-tvqjBHqXnAmz5D9yx0e04/' className="dark:text-black" />
        </Footer>
      </Wrapper>
    </div>
  );
};

export default FooterComponent;
