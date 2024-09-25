import { getAllCharactersProperty, GroupedTopics } from "@/utils";
import { alphabeticalArrangement } from "@/utils/data";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
export interface IAlphabetGrouping {
  currentGroup: string;
  groupedTopics: GroupedTopics;
  scrolled: boolean;
  setScrolled: Dispatch<SetStateAction<boolean>>;
}
const AlphabetGrouping = ({
  currentGroup,
  groupedTopics,
  scrolled,
  setScrolled,
}: IAlphabetGrouping) => {
  const allCharacters = getAllCharactersProperty(
    alphabeticalArrangement,
    groupedTopics
  );
  return (
    <div
      className={
        "grid grid-cols-5 p-5 gap-4 lg:p-6  2xl:gap-6  border border-gray-custom-1200 rounded-md"
      }
    >
      {allCharacters.map((char) => (
        <Link
          key={char.alp}
          href={`#${!char.isDisabled ? char.alp.toLowerCase() : ""}`}
          className={` flex justify-center items-center w-8 h-8 text-base 2xl:h-10 2xl:w-10 2xl:text-lg
            ${char.isDisabled && "text-gray-custom-1400 cursor-not-allowed"} ${
            currentGroup == char.alp
              ? "text-orange-custom-100 bg-orange-custom-900 rounded-[4px]"
              : ""
          } `}
        >
          {char.alp}
        </Link>
      ))}
    </div>
  );
};

export default AlphabetGrouping;
