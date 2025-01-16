"use client";
import Link from "next/link";
import { ExploreNavigationItems } from "@/utils/data";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ArrowLinkUpRight } from "@bitcoin-dev-project/bdp-ui/icons";

const ExploreNavigation = () => {
  return (
    <section className='hidden md:flex  flex-shrink-0 sticky top-0 overflow-y-auto flex-col self-start gap-4 2xl:gap-6 w-full max-w-[240px] 2xl:max-w-[320px]'>
      <div className='flex flex-col gap-4 2xl:gap-6 rounded-lg px-5 py-[23px] border border-gray-custom-1200 dark:border-gray-custom-1800'>
        {ExploreNavigationItems.map((item) => (
          <ExploreNavigationItem key={item.href} href={item.href} title={item.title} />
        ))}
      </div>
      <div className='flex flex-col gap-4 rounded-lg p-4 border border-gray-custom-1200 dark:border-gray-custom-1800'>
        <p className='text-sm 2xl:text-lg font-semibold'>Review Transcripts</p>
        <Link
          href='https://review.btctranscripts.com'
          target='_blank'
          className="relative flex items-center gap-1 w-fit text-xs 2xl:text-base font-semibold before:content-[''] before:absolute before:bottom-[-3px] before:left-0 before:w-full before:h-[1px] before:bg-black hover:before:h-[2px] before:transition-all"
        >
          <span className='leading-none'>Earn Sats</span>
          <span className=''>
            <ArrowLinkUpRight className='w-4 2xl:w-5' pathProps={{ strokeWidth: 1.8 }} />
          </span>
        </Link>
      </div>
    </section>
  );
};

const ExploreNavigationItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();
  let pagePath = pathname.split("/")[1].toLowerCase();

  const switchState = () => {
    let isActive = false;
    const navList = ExploreNavigationItems.map((item) => item.title.toLowerCase()).includes(pagePath);

    if (navList) {
      isActive = pagePath === title.toLowerCase();
    } else if (!navList) {
      pagePath = "sources";
      isActive = pagePath === title.toLowerCase();
    }

    return { isActive };
  };

  const { isActive } = switchState();

  return (
    <Link
      data-active={isActive}
      href={href}
      className={twMerge(
        `text-sm 2xl:text-lg leading-none px-4 py-4 rounded-lg 2xl:px-6 2xl:py-6 2xl:rounded-xl hover:bg-orange-custom-800  hover:text-orange-custom-100
        transition-all dark:hover:bg-brown-custom-100 `,
        isActive ? "bg-orange-custom-800 text-orange-custom-100 font-semibold dark:bg-brown-custom-100" : ""
      )}
    >
      {title}
    </Link>
  );
};

export default ExploreNavigation;
