"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  CloseIconOutlined,
  SearchIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { URLSearchParamsKeyword } from "@/config";

const SearchBox = ({ onSubmit }: { onSubmit?: (searchString: string) => void }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get(URLSearchParamsKeyword.SEARCH) || "";

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState<string>(searchQuery || "");

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

  const isContainerOpen = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.trim()) {
      return;
    };
    // makeQuery(searchInput);
    router.push(`/search?${URLSearchParamsKeyword.SEARCH}=${searchInput}`);
    setFocus(false);
    inputRef?.current?.blur();
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

  const triggerInputFocus = useCallback(() => { 
    setFocus(true);
    inputRef?.current?.focus();
  }, [inputRef]);

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
      className="w-full max-w-[40%] peer/search group/search isolate data-[freeze-body-mobile='true']:z-[99] h-[48px]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        ref={searchBoxRef}
        tabIndex={0}
        className={`${
          onFocus ? "popout" : ""
        } flex md:items-start w-full h-full`}
      >
        <div className="relative hidden md:block group-data-[input-focus='true']/search:block w-full">
          {/* input box container */}
          <div
            className={`${
              isContainerOpen
                ? "rounded-b-none rounded-tl-lg md:rounded-tl-[14px] group-data-[input-focus='true']/search:rounded-tr-lg group-data-[input-focus='true']/search:md:rounded-tr-none"
                : "rounded-l-xl md:rounded-l-[14px] group-data-[input-focus='true']/search:rounded-r-lg group-data-[input-focus='true']/search:md:rounded-r-none"
            } ${
              onFocus
                ? "border bg-custom-white md:bg-inherit shadow-lg md:shadow-none"
                : "border"
            }
                  border-r-0 h-[48px] w-full bg-custom-background border-gray-custom-300 flex`}
          >
            <input
              id="header-search-input"
              ref={inputRef}
              onChange={handleChange}
              value={searchInput}
              inputMode="search"
              placeholder="Search here"
              className="text-custom-primary-text font-medium placeholder:text-gray-custom-300 py-1.5 md:py-3 px-3 md:px-6 md:text-base placeholder:text-[14px] md:placeholder:text-base h-full w-full border-none outline-none bg-transparent"
              onClick={handleOnFocus}
            />
            {onFocus && !!(searchInput.trim()) && (
              <button
                type="button"
                onClick={onClearInput}
                className="m-3 grid place-items-center text-red-500"
              >
                <CloseIconOutlined
                  className="cursor-pointer w-[12px] md:w-[14px] transition-all duration-300 active:scale-95"
                  role="button"
                />
              </button>
            )}
          </div>
        </div>
        <button className="hidden md:flex bg-orange-custom-100 group-data-[input-focus='true']/search:hidden group-data-[input-focus='true']/search:md:flex items-center bg-gradient h-[48px] px-4 min-h-full rounded-r-lg md:rounded-r-[14px]">
          <SearchIcon className="text-custom-white w-[14px] md:w-[18px] h-auto" />
        </button>
        {/* Mobile search button */}
        <button type="button" className="flex self-center md:hidden items-center bg-gradient h-full">
          <SearchIcon className="text-custom-black-custom-200 w-6 h-auto" onClick={triggerInputFocus} />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
