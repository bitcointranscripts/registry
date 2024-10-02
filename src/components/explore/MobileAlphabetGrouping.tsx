"use client";
import React, { useEffect, useRef } from "react";
import { IAlphabetGrouping } from "./AlphabetGrouping";
import { alphabeticalArrangement } from "@/utils/data";
import { getAllCharactersProperty } from "@/utils";

const MobileAlphabetGrouping = ({
  currentGroup,
  groupedData,
}: IAlphabetGrouping) => {
  const allCharacters = getAllCharactersProperty(
    alphabeticalArrangement,
    groupedData
  );
  const selectRef = useRef<HTMLSelectElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const onOptionsChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (linkRef.current) {
      linkRef.current.href = `#${value.toLowerCase()}`;
      linkRef.current.click();
    }
  };

  useEffect(() => {
    if (currentGroup) {
      if (selectRef.current) {
        selectRef.current.value = currentGroup;
      }
    }
  }, [currentGroup]);
  return (
    <>
      <a href={"#a"} ref={linkRef} className="hidden">
        {" "}
        link group
      </a>
      <div className="selection-box pr-2 bg-orange-custom-800 py-2.5 px-4 rounded-md">
        <select
          onChange={onOptionsChange}
          ref={selectRef}
          className="pr-3  bg-orange-custom-800   w-full outline-none font-medium"
        >
          {Object.entries(allCharacters).map((char) => (
            <option
              key={char[1].alp}
              value={char[1].alp}
              disabled={char[1].isDisabled}
            >
              {char[1].alp}{" "}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default MobileAlphabetGrouping;
