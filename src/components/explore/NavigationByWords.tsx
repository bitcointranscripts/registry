"use client";

import {
  createContentSlug,
  createSlug,
  ExploreGroupedData,
  NavigationList,
} from "@/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface IContentNavigation {
  currentGroup: string;
  navigationList: NavigationList[] | ExploreGroupedData[]; // Account for Explore Page and Transcript Page
  screen?: "mobile" | "desktop";
  className?: string;
}
const NavigationByWords = ({
  currentGroup,
  navigationList,
  screen,
  className,
}: IContentNavigation) => {

  const selectRef = useRef<HTMLSelectElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const onOptionsChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (linkRef.current) {
      linkRef.current.href = `#${value}`;
      linkRef.current.click();
    }
  };

  useEffect(() => {
    if (currentGroup) {
      if (selectRef.current) {
        selectRef.current.value = `${createSlug(currentGroup)}`;
      }
    }
  }, [currentGroup]);

  return (
    <>
      {screen === "desktop" && (
        <div
          className={twMerge(
            " flex-col pt-1 px-5 pb-5 hidden lg:flex  border max-h-[calc(95vh-var(--header-height))] overflow-auto scroller border-gray-custom-1200 dark:border-gray-custom-1800  rounded-md w-full min-w-[260px] 2xl:min-w-[354px] ",
            className,
          )}
        >
          {navigationList.map((nav) => (
              <Link
                key={nav?.slug}
                href={`#${nav.slug}`}
                className={twMerge(
                  "flex text-sm 2xl:text-lg leading-5 ",
                  createContentSlug(currentGroup) == nav?.slug
                    ? "text-orange-custom-100  rounded-[4px] font-semibold"
                    : "hover:text-orange-custom-100",
                  nav?.nested === true
                    ? "pl-4 pt-2 2xl:pt-3.5"
                    : "pt-3 2xl:pt-5",
                )}
              >
                {nav?.name}
              </Link>
            ))}
        </div>
      )}
      {screen === "mobile" && (
        <>
          <a href={"#a"} ref={linkRef} className="hidden">
            {" "}
            link group
          </a>
          <div className="selection-box pr-2 bg-orange-custom-800 dark:bg-brown-custom-100 py-2.5 px-4 rounded-md ">
            <select
              onChange={onOptionsChange}
              ref={selectRef}
              className="pr-3  bg-orange-custom-800 dark:bg-brown-custom-100 w-full outline-none font-medium"
            >
              {navigationList.map((nav) => (
                <option key={nav.slug} value={nav.slug}>
                  {nav.name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default NavigationByWords;
