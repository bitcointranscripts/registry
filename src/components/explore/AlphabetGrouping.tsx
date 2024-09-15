import {
  getAllCharactersProperty,
  GroupedTopics,
} from "@/utils";
import { alphabeticalArrangement } from "@/utils/data";
import Link from "next/link";
import React, { useState } from "react";
export interface IAlphabetGrouping {
  currentGroup: string;
  groupedTopics: GroupedTopics[];
}
const AlphabetGrouping = ({
  currentGroup,
  groupedTopics,
}: IAlphabetGrouping) => {
  const allCharacters = getAllCharactersProperty(
    alphabeticalArrangement,
    groupedTopics
  );
  return (
    <div
      className={
        "fixed top-10 right-10 grid grid-cols-5 p-5 gap-4 g:gap-6 lg:p-6 max-w-[max-content] lg:max-w-[355px] w-full border border-gray-custom-1200 rounded-md"
      }
    >
      {allCharacters.map((char) => (
        <Link
          key={char.alp}
          href={`#${!char.isDisabled ?char.alp.toLowerCase():""}`}
          className={` flex justify-center items-center w-8 h-8 text-base xl:h-10 xl:w-10 xl:text-lg
            ${char.isDisabled && "text-gray-custom-1300 cursor-not-allowed"} ${
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
