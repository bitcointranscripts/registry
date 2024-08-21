"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppsIcon, ArrowRight, DayIcon, NightIcon, SearchIcon } from "bdp-ui/icons";
import { Wrapper, Logo } from ".";
import MenuIcon from "/public/svgs/menu.svg";

const LanguageSwitcher = () => {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen(!isOpen);
  const languages = ["EN", "ES", "ZH"];

  useEffect(() => {
    const handleFocusOut = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [isOpen]);

  return (
    <div className='w-full relative max-md:hidden hidden' ref={wrapperRef}>
      <section className='group/menuBtn'>
        <div
          className='bg-gray-custom-100 border border-gray-custom-400 w-[108px] h-12 text-black rounded-lg cursor-pointer before:absolute capitalize flex items-center justify-between pl-[17px] pr-[11px] max-xl:h-9 max-xl:w-[72px] max-xl:p-2'
          onClick={toggle}
        >
          <p className='cursor-pointer text-black'>{languages[0]}</p>
          <span className={`group-aria-[expanded=false]/menuBtn:rotate-180 transition-transform ${isOpen && "rotate-180 transition-transform"}`}>
            <ArrowRight className='rotate-90 w-[28px] h-[14px] text-black max-xl:w-5' />
          </span>
        </div>
      </section>

      <section
        className={`focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 right-0 left-0 bg-white max-h-[300px] overflow-scroll font-medium rounded-xl shadow-md py-2 border border-gray-400 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {languages.slice(1).map((item, index) => (
          <div key={`${item}_${index}`} className='group'>
            <div className='w-full px-5 py-[8px] flex gap-2 group-data-[selected=false]:hover:bg-gray-200 hover:bg-gray-200 cursor-pointer items-center'>
              <span className={"group-data-[selected=true]:text-[#2d2d2d] text-gray-400 group-data-[selected=true]:font-bold capitalize"}>
                {item}
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

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
      <button ref={buttonRef} onClick={() => setIsOpen((v) => !v)} className=''></button>
      <div className='relative'>
        <div data-is-open={open} ref={popoverRef} className='hidden data-[is-open=true]:block absolute top-0 right-0 mt-3 md:mt-4'></div>
      </div>
    </div>
  );
};

function ThemeSwitcher() {
  return (
    <div className='relative max-md:hidden hidden'>
      <div className='flex items-center border bg-gray-custom-100 rounded-lg h-12 w-24 max-xl:h-9 max-xl:w-[72px]'>
        <button className='flex items-center justify-center rounded-lg w-12 h-full bg-orange-custom-700'>
          <DayIcon className='text-orange-custom-100 w-4' />
        </button>
        <button className='flex items-center justify-center w-12'>
          <NightIcon className='text-custom-black-custom-100 w-4' />
        </button>
        <div className='rounded-lg top-0 absolute w-1/2 h-full border border-orange-custom-100 dark:border-custom-stroke transition-all duration-300 left-0' />
      </div>
    </div>
  );
}

const SearchComponent = () => {
  return (
    <div className='md:flex relative w-full max-w-[540px] max-md:hidden'>
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
  return (
    <Wrapper className='h-[140px] flex items-center justify-between bg-white sticky top-0 border-b-[0.5px] border-b-gray-custom-200 z-10 gap-6 max-lg:gap-4 max-md:h-[86px]'>
      <section className='flex items-center gap-16 max-xl:gap-8 max-lg:gap-4'>
        <Logo iconStyles='w-9 max-xl:w-[30px]' textStyles='text-black text-[24px] leading-[36.77px] max-lg:text-base' />
        <nav className='md:flex items-center gap-16 text-black max-xl:gap-4 max-lg:text-sm max-md:hidden'>
          <Link href='/transcripts' className=''>
            Transcripts
          </Link>
          <Link href='/transcripts' className='hidden'>
            About
          </Link>
        </nav>
      </section>

      <SearchComponent />

      <section className='flex gap-4 max-lg:gap-2 items-center max-md:hidden'>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <section className='md:flex max-md:hidden'>
          <button className='border border-orange-custom-100 rounded-lg w-12 h-12 flex items-center justify-center max-xl:w-9 max-xl:h-9'>
            <AppsIcon className='text-orange-custom-100 w-[28px]' />
          </button>
        </section>
      </section>
      <button className='md:hidden max-md:flex'>
        <Image src={MenuIcon} alt='menu icon' />
      </button>
    </Wrapper>
  );
};

export default Header;
