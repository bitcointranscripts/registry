"use client"

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../landing-page/MobileMenu";
import { MenuApp, menuApps } from "@/utils/data";
import { AppsIcon, ArrowRight, CloseIconOutlined, DayIcon, NightIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import Wrapper from "./Wrapper";
import Logo from "./Logo";
export const LanguageSwitcher = () => {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen(!isOpen);
  const languages = ["EN", "ES", "ZH"];

  useEffect(() => {
    const handleFocusOut = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [isOpen]);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      <section className="group/menuBtn">
        <div
          className="bg-gray-custom-100 border border-gray-custom-400 w-[108px] h-12 text-black rounded-lg cursor-pointer before:absolute capitalize flex items-center justify-between pl-[17px] pr-[11px] max-xl:h-9 max-xl:w-[72px] max-xl:p-2 max-md:w-[189px]"
          onClick={toggle}
        >
          <p className="cursor-pointer text-black">{languages[0]}</p>
          <span
            className={`group-aria-[expanded=false]/menuBtn:rotate-180 transition-transform ${isOpen && "rotate-180 transition-transform"}`}
          >
            <ArrowRight className="rotate-90 w-[28px] h-[14px] text-black max-xl:w-5" />
          </span>
        </div>
      </section>

      <section
        className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {languages.slice(1).map((item, index) => (
          <div key={`${item}_${index}`} className="group">
            <div className="w-full px-5 py-2 flex gap-2 group-data-[selected=false]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer items-center">
              <span
                className={
                  "group-data-[selected=true]:text-[#2d2d2d] text-gray-400 group-data-[selected=true]:font-bold capitalize"
                }
              >
                {item}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export const AppItem = ({ href, image, alt, title }: MenuApp) => (
  <div className="py-1 first-of-type:pt-4  md:py-2 px-4 md:px-5 first-of-type:md:pt-6 last-of-type:pb-4 last-of-type:md:pb-6">
  <Link
    href={href}
    className=" py-2  hover:px-2 hover:md:px-3 gap-3 md:gap-6 flex items-center rounded-xl
    hover:bg-orange-custom-600 dark:hover:bg-brown-custom-100 transition-all duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      className={`rounded-xl w-11 h-11 lg:w-16 lg:h-16 ${
        alt === "Bitcoin search" || alt === "Bitcoin TLDR"
          ? "border-[1.5px] border-gray-custom-600 dark:border-gray-custom-1800"
          : ""
      }`}
      src={image}
      alt={alt}
      width={88}
      height={88}
    />
    <p className="text-xs md:text-sm xl:text-base 2xl:text-lg text-left dark:text-gray-custom-100">
      {title}
    </p>
  </Link>
  </div>
);

export function AppMenu() {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-custom-600 w-[min(90vw,300px)] md:w-[402px] max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-100px)] overflow-auto`}
    >
      <AppItem {...menuApps[0]} />
      <div className="mx-5 md:mx-7 my-3 md:my-3 border border-custom-stroke"></div>
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
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col">
      <button ref={buttonRef} onClick={() => setIsOpen((v) => !v)}>
        <div>
          <div
            className={`flex flex-col rounded-lg border border-orange-custom-100 w-12 h-12 items-center justify-center max-xl:w-9 max-xl:h-9 transition-[background-color] duration-200 ${
              open
                ? "bg-custom-hover-state shadow-custom-sm"
                : "bg-custom-background"
            }`}
          >
            <div data-freeze-body={open}>
              <AppsIcon className="text-orange-custom-100 w-[28px]" />
            </div>
          </div>
        </div>
      </button>
      <div className="relative z-10">
        <div
          data-is-open={open}
          ref={popoverRef}
          className="hidden data-[is-open=true]:block absolute top-0 right-0 mt-3 md:mt-4"
        >
          <div
            className={`bg-white dark:bg-dark-custom-100 rounded-2xl border border-gray-custom-600 w-[min(90vw,300px)] md:w-[402px] max-h-[calc(100vh-70px)] md:max-h-[calc(100vh-100px)] overflow-auto`}
          >
            <AppItem {...menuApps[0]} />
            <div className="mx-5 md:mx-7 my-3 md:my-3 border border-gray-custom-300 dark:border-b-gray-custom-1800"></div>
            {menuApps.slice(1).map((item) => (
              <AppItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`max-h-screen fixed bg-[#0000007f] top-0 bottom-0 right-0 left-0 ${open ? "flex" : "hidden"}`}
      ></div>
    </div>
  );
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative">
      <div
        className={`flex items-center border dark:border-dark-custom-500 bg-gray-custom-100 dark:bg-dark-custom-600 rounded-lg h-12 w-24 max-xl:h-9 max-xl:w-[72px] max-md:w-24 max-md:h-12`}
      >
        <button
          onClick={toggleDarkMode}
          className="flex cursor-pointer items-center justify-center rounded-lg w-12 h-full bg-orange-custom-700 dark:bg-transparent">
          <DayIcon
            className="text-orange-custom-100 w-4 dark:text-gray-custom-2000"
          />
        </button>
        <button
          onClick={toggleDarkMode}
          className="flex cursor-pointer items-center justify-center w-12 dark:bg-dark-custom-500 h-full rounded-lg">
          <NightIcon
            className="text-custom-black-custom-100 w-4 dark:text-gray-custom-2000 "
          />
        </button>
        <div
          onClick={toggleDarkMode}
        className="rounded-lg cursor-pointer top-0 absolute w-1/2 h-full border border-orange-custom-100 dark:border-none transition-all duration-300 left-0 max-w-12 max-xl:w-9 max-md:w-12" />
      </div>
    </div>
  );
}
const SearchComponent = () => {
  return (
    <div className='hidden'>
      {/* <div className='md:flex relative w-full max-w-[540px] max-md:hidden hidden'> */}
      <input
        placeholder='Search here'
        className='max-w-[540px] w-full h-[66px] max-xl:h-12 text-gray-custom-300 outline-none rounded-[14px] border border-gray-custom-400 bg-gray-custom-100 px-6'
      />
      <button className='h-[66px] w-[72px] flex items-center justify-center bg-orange-custom-100 absolute right-[-1px] rounded-r-[14px]  max-xl:h-12 max-xl:w-12'>
        <SearchIcon className='text-white w-[18px]' />
      </button>
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
  <div className='flex items-center justify-center border-b-[0.5px] border-b-gray-custom-200 max-md:border-b-0 w-full sticky top-0 z-20'>
      <Wrapper className='h-[var(--header-height)] flex items-center w-full justify-between bg-white sticky top-0 z-20 gap-6 max-lg:gap-4 max-md:h-[86px]'>
        <section className='flex items-center gap-16 max-xl:gap-8 max-lg:gap-4'>
          <Link href="/">
          <Logo iconStyles='w-9 max-xl:w-[30px]' textStyles='text-black text-[24px] leading-[36.77px] max-lg:text-base' />
          </Link>
        <nav className='md:hidden items-center gap-16 text-black max-xl:gap-4 max-lg:text-sm max-md:hidden'>
            <Link href='/categories'>Transcripts</Link>
            <Link href='/about' className='hidden'>
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
          <div className='max-md:hidden hidden'>
            <LanguageSwitcher />
          </div>
        <div className='max-md:hidden hidden'>
            <ThemeSwitcher />
          </div>
        <nav className='md:flex items-center gap-16 text-black max-xl:gap-4 max-lg:text-sm max-md:hidden h-full'>
            <Link href='/categories'>Transcripts</Link>
            <Link href='/about' className=''>
              About
            </Link>
          </nav>
          <div className='md:flex max-md:hidden'>
            <MenuSwitcher />
          </div>
        </section>

      <div className='max-md:gap-4 items-center md:hidden max-md:flex'>
          <button className='md:hidden max-md:flex hidden'>
            <SearchIcon className='text-black w-6' />
          </button>
          <button className='md:hidden max-md:flex h-8 w-8 items-center justify-center' onClick={() => setOpen(!open)}>
            {open ? <CloseIconOutlined className='w-5' /> : <Image src={MenuIcon} alt='menu icon' />}
          </button>
        </div>
        {open ? (
          <div className="w-full bg-white dark:bg-dark-custom-100 top-[86px] left-0 right-0 bottom-0 p-4 z-40 pt-3 pb-8 overflow-scroll md:hidden max-md:fixed">
            <MobileMenu setOpen={setOpen} />
          </div>
        ) : null}
      </Wrapper>
    </div>
  );
};

export default Header;
