"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  CloseIconOutlined,
  SearchIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { URLSearchParamsKeyword } from "@/config";
import { twMerge } from "tailwind-merge";
import useLang from "@/hooks/useLang";
import { generateNewUrlForLanguage } from "@/utils/locale";

const MobileSearchBox = ({
  onSubmit,
}: {
  onSubmit?: (searchString: string) => void;
}) => {
  const language = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get(URLSearchParamsKeyword.SEARCH) || "";

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState<string>(searchQuery || "");

  const [open, setOpen] = useState(false);

  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchInput("");
    inputRef?.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.trim()) {
      return;
    }
    const newUrl = generateNewUrlForLanguage(`/search?${URLSearchParamsKeyword.SEARCH}=${searchInput}`, language);
    router.push(newUrl);
    setOpen(false);
    if (onSubmit) {
      onSubmit(searchInput);
    }
  };

  const triggerInputClick = useCallback(() => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
  }, [inputRef]);

  const triggerInputFocus = () => {
    setOpen(true);
    triggerInputClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!open) return;
      if (!(event.target instanceof Node)) {
        return;
      }
      if (
        !searchBoxRef.current ||
        searchBoxRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, searchBoxRef.current]);

  // set search input value on mount and update it when searchQuery changes (e.g navigates to a new page)
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  return (
    <form
      data-freeze-body-mobile={open}
      className="flex w-full max-w-[40%] peer/search group/search isolate data-[freeze-body-mobile='true']:z-[99] h-auto"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div ref={searchBoxRef} tabIndex={0} className={open ? "popout" : ""}>
        {/* input box container */}
        <div
          className={twMerge(
            open ? "flex" : "hidden",
            "relative w-full px-2 rounded-xl border border-gray-custom-300 bg-custom-white shadow-lg"
          )}
        >
          <input
            id="header-search-input"
            ref={inputRef}
            onChange={handleChange}
            value={searchInput}
            inputMode="search"
            placeholder="Search here"
            className="text-custom-primary-text font-medium text-lg placeholder:text-gray-custom-300 py-1.5 placeholder:text-[14px] h-full w-full border-none outline-none bg-transparent"
            autoFocus={true}
            spellCheck="false"
          />
          
          <div data-is-visible={open && !!searchInput.trim()} className="hidden ml-2 data-[is-visible='true']:flex">
            <button
              type="button"
              onClick={onClearInput}
              className="cursor-pointer m-3 grid place-items-center text-red-500"
            >
              <CloseIconOutlined
                className="pointer-events-none w-[12px] md:w-[14px] transition-all duration-300 active:scale-95"
              />
            </button>
            <button
              type="submit"
              className={
                "self-center items-center bg-gradient h-full"
              }
            >
              <SearchIcon
                className="text-orange-custom-100 w-5 h-auto"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search button */}
      <button
        type="button"
        className={"self-center items-center bg-gradient h-full"}
      >
        <SearchIcon
          className="text-custom-black-custom-200 w-6 h-auto"
          onClick={triggerInputFocus}
        />
      </button>
    </form>
  );
};

export default MobileSearchBox;
