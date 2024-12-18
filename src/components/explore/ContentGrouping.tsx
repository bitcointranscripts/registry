"use client";

import { createContentSlug, createSlug, GroupedData } from "@/utils";
import Link from "next/link";
import { SetStateAction, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface IContentGrouping {
  currentGroup: string;
  groupedData: GroupedData | never[];
  screen?: "mobile" | "desktop";
  className?: string;
}
const ContentGrouping = ({
  currentGroup,
  groupedData,
  screen,
  className,
}: IContentGrouping) => {
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
        selectRef.current.value = `${currentGroup}`;
      }
    }
  }, [currentGroup]);

  return (
    <>
      {screen === "desktop" && (
        <div
          className={twMerge(
            " flex-col p-5 hidden lg:flex gap-2.5 border max-h-[calc(90vh-var(--header-height))] overflow-auto scroller border-gray-custom-1200 rounded-md w-full min-w-[260px] 2xl:min-w-[354px] ",
            className
          )}
        >
          {Object.keys(groupedData).map((char) => (
            <Link
              key={char}
              href={`#${createContentSlug(char)}`}
              className={`flex text-sm  2xl:text-lg leading-5   ${
                createContentSlug(currentGroup) == createContentSlug(char)
                  ? "text-orange-custom-100 rounded-[4px] font-semibold"
                  : ""
              } `}
            >
              {char}
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
          <div className="selection-box pr-2 bg-orange-custom-800 py-2.5 px-4 rounded-md ">
            <select
              onChange={onOptionsChange}
              value={currentGroup}
              ref={selectRef}
              className="pr-3  bg-orange-custom-800   w-full outline-none font-medium"
            >
              {Object.keys(groupedData).map((char) => (
                <option key={char} value={createContentSlug(char)}>
                  {char}{" "}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default ContentGrouping;
