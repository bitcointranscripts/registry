"use client";

import React, { useState, useRef, useEffect } from "react";

import { isMac } from "@/utils/user";
import { useSearch } from "@/app/search/useSearch";
import {
  AppsIcon,
  ArrowRight,
  CloseIconOutlined,
  DayIcon,
  NightIcon,
  SearchIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";

const SearchBox = ({ onSubmit }: { onSubmit?: (searchString: string) => void }) => {
  const { searchQuery, makeQuery } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);

  const [searchInput, setSearchInput] = useState<string>(searchQuery);

  const [onFocus, setFocus] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    inputRef?.current?.focus();
    setSearchInput("");
  };

  const isAutoCompleteContainerOpen =
    // onFocus && searchInput.trim().length > 2 && !!allAutocompletedItemsCount;
    false;

  const isContainerOpen = false;

  const isShortcutVisible = !onFocus;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.trim()) {
      return;
    };
    makeQuery(searchInput);
    if (onSubmit) {
      onSubmit(searchInput);
    }
  };

  const handleOnFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    // if (!autoCompleteHeight.current) {
    //   autoCompleteHeight.current = window.innerHeight / 2 - paddingHeightMobile;
    // }
    setFocus(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }
      if (
        !searchBoxRef.current ||
        searchBoxRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setFocus(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form
      data-input-focus={onFocus}
      data-freeze-body-mobile={onFocus}
      className="w-full peer/search group/search isolate data-[freeze-body-mobile='true']:z-[99]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        ref={searchBoxRef}
        tabIndex={0}
        className={`${
          onFocus ? "popout" : ""
        } flex items-start w-full`}
        // onKeyDown={handleKeyDown}
      >
        <div className="relative w-full">
          {/* input box container */}
          <div
            className={`${
              isContainerOpen
                ? "rounded-b-none rounded-tl-lg md:rounded-tl-[14px] group-data-[input-focus='true']/search:rounded-tr-lg group-data-[input-focus='true']/search:md:rounded-tr-none"
                : "rounded-l-xl md:rounded-l-[14px] group-data-[input-focus='true']/search:rounded-r-lg group-data-[input-focus='true']/search:md:rounded-r-none"
            } ${
              onFocus
                ? "border-0 border-b-[1px] relative z-[1] md:border"
                : "border"
            }
                  border-r-0 h-[48px] 2xl:h-[66px] w-full bg-custom-background border-custom-stroke flex`}
          >
            <input
              ref={inputRef}
              onChange={handleChange}
              inputMode="search"
              placeholder="Search for topics, authors or resources..."
              className="search_box_view-input 2xl:text-xl text-custom-primary-text font-medium placeholder:text-custom-secondary-text search-box py-1.5 md:py-3 px-3 md:px-6 md:text-base placeholder:text-[14px] md:placeholder:text-base h-full w-full border-none outline-none bg-transparent"
              onClick={handleOnFocus}
            />
            {isShortcutVisible && (
              <p className="absolute right-0 mr-3 pointer-events-none font-geist whitespace-nowrap bg-transparent hidden md:inline-block text-sm text-custom-stroke dark:text-custom-primary-text self-center">
                <kbd className="font-geist">{isMac() ? "⌘" : "CTRL"}</kbd> +{" "}
                <kbd className="font-geist">K</kbd> or
                {" /"}
              </p>
            )}
            {onFocus && !!searchInput.trim() && (
              <button
                type="button"
                onClick={onClearInput}
                className="mx-2 grid place-items-center"
              >
                <CloseIconOutlined
                  className="cursor-pointer w-[20px] md:w-auto"
                  role="button"
                />
              </button>
            )}
          </div>
        </div>
        <button className="bg-orange-custom-100 group-data-[input-focus='true']/search:hidden group-data-[input-focus='true']/search:md:flex md:flex items-center bg-gradient h-[48px] 2xl:h-[66px] px-4 2xl:px-[27px] min-h-full rounded-r-lg md:rounded-r-[14px]">
          <SearchIcon className="text-custom-background w-[14px] md:w-[18px] 2xl:w-[24px] h-auto" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
