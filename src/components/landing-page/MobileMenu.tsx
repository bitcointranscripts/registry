import React, { SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExploreNavigationItems, menuApps } from "@/utils/data";
import { LanguageSwitcher, ThemeSwitcher } from "../layout/Header";
import { ArrowLinkUpRight } from "@bitcoin-dev-project/bdp-ui/icons";

const MobileMenu = ({setOpen}:{setOpen: React.Dispatch<SetStateAction<boolean>>}) => {
  const links = ExploreNavigationItems;

  return (
    <div className='flex flex-col gap-6 bg-white dark:bg-dark-custom-100 min-h-full overflow-y-scroll'>
      <section className='flex-col gap-2 '>
        <p className='text-lg font-medium text-black'>Transcripts</p>
        <div className='w-full flex flex-col'>
          {links.map((link) => (
            <Link
              href={link.href}
              onClick={()=>setOpen(false)}
              className='capitalize py-3 px-4 text-gray-custom-1000 dark:text-black
              hover:bg-orange-custom-800 hover:font-semibold hover:text-orange-custom-100 dark:hover:bg-brown-custom-100
              dark:hover:text-orange-custom-100'
            >
              {link.title}
            </Link>
          ))}
        </div>
      </section>
      <section className='flex flex-col gap-6'>
        <p className='text-lg font-medium text-black hidden'>About</p>
        <div className='w-fit hidden'>
          <LanguageSwitcher />
        </div>
        <div className='w-fit'>
          <ThemeSwitcher />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-medium text-black'>All Products</p>
          <section className='flex max-w-[400px] gap-12 flex-wrap max-xl:gap-6 max-md:max-w-full max-lg:gap-4'>
            {menuApps.slice(1).map(({ href, image, alt }) => (
              <Link href={href} target='_blank' rel='noopener noreferrer' key={alt}>
                <Image
                  className={`rounded-xl w-[54px] h-[54px] lg:w-16 lg:h-16 ${
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
        </div>
        <button className='flex flex-col gap-2 items-start p-4 border border-gray-custom-600 rounded-md'>
          <p className='text-lg leading-[30px] font-semibold text-black'>Review Transcripts</p>
          <Link href='https://review.btctranscripts.com/' target='_blank' className='flex border-b border-b-gray-custom-1000'>
            <p className='text-lg leading-[30px] font-semibold text-black'>Earn Sats</p>
            <ArrowLinkUpRight className='w-5' />
          </Link>
        </button>
      </section>
    </div>
  );
};

export default MobileMenu;
