"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CloseIconOutlined,
  SearchIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { URLSearchParamsKeyword } from "@/config";
import useLang from "@/hooks/useLang";
import { generateNewUrlForLanguage } from "@/utils/locale";
import useTranslations from "@/hooks/useTranslations";

const SearchBox = ({ onSubmit }: { onSubmit?: (searchString: string) => void }) => {
  const language = useLang();
  const t = useTranslations(language);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput?.trim()) {
      return;
    };
    const newUrl = generateNewUrlForLanguage(`/search?${URLSearchParamsKeyword.SEARCH}=${searchInput}`, language);
    router.push(newUrl);
    inputRef?.current?.blur();
    if (onSubmit) {
      onSubmit(searchInput);
    }
  };

  // set search input value on mount and update it when searchQuery changes (e.g navigates to a new page)
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  return (
    <form
      className="hidden md:block w-full max-w-[40%] peer/search group/search isolate h-[48px]"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div
        ref={searchBoxRef}
        tabIndex={0}
        className={`flex md:items-start w-full h-full`}
      >
        <div className="relative block w-full">
          {/* input box container */}
          <div
            className={`rounded-l-[14px] border border-r-0 h-[48px] w-full bg-custom-background border-gray-custom-300 flex`}
          >
            <input
              id="header-search-input"
              ref={inputRef}
              onChange={handleChange}
              value={searchInput}
              inputMode="search"
              placeholder={t("search.placeholder")}
              className="text-custom-primary-text font-medium placeholder:text-gray-custom-300 py-1.5 md:py-3 px-3 md:px-6 md:text-base placeholder:text-[14px] md:placeholder:text-base h-full w-full border-none outline-none bg-transparent"
              onFocus={() => setFocus(true)}
            />
            
            <button
              type="button"
              data-is-visible={onFocus && !!(searchInput.trim())}
              onClick={onClearInput}
              className="m-3 hidden data-[is-visible='true']:grid place-items-center text-gray-custom-200"
            >
              <CloseIconOutlined
                className="pointer-events-none w-[12px] md:w-[14px] transition-all duration-300 active:scale-95"
              />
            </button>
          </div>
        </div>
        <button className="flex bg-orange-custom-100 items-center bg-gradient h-[48px] px-4 min-h-full rounded-r-[14px]">
          <SearchIcon className="text-custom-white w-[18px] h-auto" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
