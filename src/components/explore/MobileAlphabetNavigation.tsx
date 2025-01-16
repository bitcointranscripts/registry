"use client";
import React, { useEffect, useRef } from "react";
import { IAlphabetNavigation } from "./AlphabetNavigation";

const MobileAlphabetGrouping = ({
  currentGroup,
  groupedData,
}: IAlphabetNavigation) => {

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
          className="pr-3 bg-orange-custom-800 w-full outline-none font-medium"
        >
          {groupedData.map((char) => (
            <option
              key={char.name}
              value={char.slug}
              disabled={char.nested && char.nested.length === 0}
            >
              {char.name}{" "}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default MobileAlphabetGrouping;
