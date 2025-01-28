"use client"

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuIcon from "/public/svgs/menu.svg";
import MobileMenu from "../../landing-page/MobileMenu";
import { MenuApp, menuApps } from "@/utils/data";
import { AppsIcon, ArrowRight, CloseIconOutlined, DayIcon, NightIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import Wrapper from "../Wrapper";
import Logo from "../Logo";
import SearchBox from "../../search/SearchBox";
import MobileSearchBox from "../../search/MobileSearchBox";
import LanguageSwitch from "./LanguageSwitch";

export const AppItem = ({ href, image, alt, title }: MenuApp) => (
  <Link
    href={href}
    className='py-2 md:py-3 px-5 md:px-8 gap-3 md:gap-6 flex items-center hover:bg-orange-custom-600 first-of-type:pt-4 first-of-type:md:pt-6 last-of-type:pb-4 last-of-type:md:pb-6'
    target='_blank'
    rel='noopener noreferrer'
  >
    <Image
      className={`rounded-xl w-11 h-11 lg:w-16 lg:h-16 ${
        alt === "Bitcoin search" || alt === "Bitcoin TLDR" ? "border-[1.5px] border-gray-custom-600" : ""
      }`}
      src={image}
      alt={alt}
      width={88}
      height={88}
    />
    <p className='text-xs md:text-sm xl:text-base 2xl:text-lg text-left '>{title}</p>
  </Link>
);

export function AppMenu() {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-custom-600 w-[min(90vw,300px)] md:w-[402px] max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-100px)] overflow-auto`}
    >
      <AppItem {...menuApps[0]} />
      <div className='mx-5 md:mx-7 my-3 md:my-3 border border-custom-stroke'></div>
      {menuApps.slice(1).map((item) => (
        <AppItem key={item.title} {...item} />
      ))}
    </div>
  );
}

const MenuSwitcher = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative flex flex-col'>
      <button ref={buttonRef} onClick={() => setIsOpen((v) => !v)}>
        <div>
          <div
            className={`flex flex-col rounded-lg border border-orange-custom-100 w-12 h-12 items-center justify-center max-xl:w-9 max-xl:h-9 transition-[background-color] duration-200 ${
              open ? "bg-custom-hover-state shadow-custom-sm" : "bg-custom-background"
            }`}
          >
            <div data-freeze-body={open}>
              <AppsIcon className='text-orange-custom-100 w-[28px]' />
            </div>
          </div>
        </div>
      </button>
      <div className='relative z-10'>
        <div data-is-open={open} ref={popoverRef} className='hidden data-[is-open=true]:block absolute top-0 right-0 mt-3 md:mt-4'>
          <div
            className={`bg-white rounded-2xl border border-gray-custom-600 w-[min(90vw,300px)] md:w-[402px] max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-100px)] overflow-auto`}
          >
            <AppItem {...menuApps[0]} />
            <div className='mx-5 md:mx-7 my-3 md:my-3 border border-gray-custom-300'></div>
            {menuApps.slice(1).map((item) => (
              <AppItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className={`max-h-screen fixed bg-[#0000007f] top-0 bottom-0 right-0 left-0 ${open ? "flex" : "hidden"}`}></div>
    </div>
  );
};

export function ThemeSwitcher() {
  return (
    <div className='relative'>
      <div className={`flex items-center border bg-gray-custom-100 rounded-lg h-12 w-24 max-xl:h-9 max-xl:w-[72px] max-md:w-24 max-md:h-12`}>
        <button className='flex items-center justify-center rounded-lg w-12 h-full bg-orange-custom-700'>
          <DayIcon className='text-orange-custom-100 w-4' />
        </button>
        <button className='flex items-center justify-center w-12'>
          <NightIcon className='text-custom-black-custom-100 w-4' />
        </button>
        <div className='rounded-lg top-0 absolute w-1/2 h-full border border-orange-custom-100 dark:border-custom-stroke transition-all duration-300 left-0 max-w-12 max-xl:w-9 max-md:w-12' />
      </div>
    </div>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex items-center justify-center border-b-[0.5px] border-b-gray-custom-200 max-md:border-b-0 w-full sticky top-0 z-20'>
      <Wrapper className='h-[var(--header-height)] flex items-center w-full md:justify-between bg-white sticky top-0 z-20 gap-6 max-lg:gap-4 max-md:h-[86px]'>
        <section className='flex items-center gap-4 md:gap-16 2xl:gap-24'>
          <Link href="/">
            <Logo iconStyles='w-[30px] xl:w-9' textStyles='text-black text-base leading-[36.77px] lg:text-[24px]' />
          </Link>
          <nav className='hidden md:flex items-center text-sm md:text-base gap-4 md:gap-8 2xl:gap-16 text-custom-black-custom-200'>
            <Link href='/categories'>Transcripts</Link>
            <Link href='/about' className=''>
              About
            </Link>
          </nav>
        </section>

        {/* without suspense, all pages deopts into CSR due to useSearchParams hook in component */}
        <Suspense fallback={<></>}>
          <SearchBox />
        </Suspense>

        {/* add active states of navigation links */}
        <section className='flex gap-16 text-black max-xl:gap-4 max-lg:gap-2 items-center max-md:hidden h-full'>
          <div className=''>
            <LanguageSwitch />
          </div>
          <div className='hidden'>
            <ThemeSwitcher />
          </div>
          <div className='md:flex max-md:hidden'>
            <MenuSwitcher />
          </div>
        </section>

        <div className='flex ml-auto gap-4 items-center md:hidden'>
          <Suspense fallback={<></>}>
            <MobileSearchBox />
          </Suspense>
          <button className='md:hidden max-md:flex h-8 w-8 items-center justify-center' onClick={() => setOpen(!open)}>
            {open ? <CloseIconOutlined className='w-5' /> : <Image src={MenuIcon} alt='menu icon' />}
          </button>
        </div>
        {open ? (
          <div className='w-full bg-white top-[86px] left-0 right-0 bottom-0 p-4 z-40 pt-3 pb-8 overflow-scroll md:hidden max-md:fixed'>
            <MobileMenu setOpen={setOpen} />
          </div>
        ) : null}
      </Wrapper>
    </div>
  );
};

export default Header;
