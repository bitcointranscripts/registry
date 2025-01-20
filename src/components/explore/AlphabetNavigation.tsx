import { ExploreGroupedData } from "@/utils";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface IAlphabetNavigation {
  currentGroup: string;
  groupedData: ExploreGroupedData[];
}
const AlphabetNavigation = ({ currentGroup, groupedData }: IAlphabetNavigation) => {

  return (
    <div
      className={
        "grid grid-cols-5 p-5 gap-4 lg:p-6  2xl:gap-6  border border-gray-custom-1200 dark:border-gray-custom-1800 rounded-md"
      }
    >
      {groupedData.map((char) =>
        char?.nested&& char?.nested.length > 0 ? (
          <Link
            key={char.slug}
            href={`#${char.slug}`}
            className={twMerge("flex justify-center items-center w-8 h-8 text-base 2xl:h-10 2xl:w-10 2xl:text-lg",
      currentGroup === char.slug
        ? "text-orange-custom-100 bg-orange-custom-900 rounded-[4px] font-semibold"
        : "hover:text-orange-custom-100",
  )}
          >
            {char.name}
          </Link>
        ) : (
          <button  key={char.slug} className="text-gray-custom-1400 cursor-not-allowed">
            {char.name}
          </button>
        )
      )}
    </div>
  );
};

export default AlphabetNavigation;
