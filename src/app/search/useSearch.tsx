"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { buildQueryCall } from "./searchCall";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { defaultParam, URLSearchParamsKeyword } from "@/config";
import React, { useCallback, useContext, useMemo } from "react";
import {
  generateFilterQuery,
  generateSortFields,
} from "@/service/URLManager/helper";
import { EsSearchResponse, Facet } from "./types";
import useLang from "@/hooks/useLang";
import { generateNewUrlForLanguage } from "@/utils/locale";

/**
 * Custom React hook for performing search queries against an Elasticsearch backend via a proxy endpoint.
 * Utilizes React Query's `useQuery` to manage fetching, caching, and updating of search results.
 */

export type QueryObject = Record<string, string>;

export type PagingInfoType = {
  resultsPerPage: number;
  current: number;
  totalResults: number | null;
};

export type SearchContextType = {
  searchQuery: string;
  queryResult: UseQueryResult<EsSearchResponse, Error>;
  makeQuery: (queryString: string) => void;
  handlePageChange: (page: number) => void;
  pagingInfo: PagingInfoType;
  filterFields: Facet[];
  sortFields: { field: string, value: string }[];
  setSearchParams: (queryObject: QueryObject) => void;
  page: number;
};

export const SearchContext = React.createContext<SearchContextType | null>(
  null
);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchContextProvider"
    );
  }
  return context;
};

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const languageCode = useLang();
  
  const [_, firstPath, secondPath] = pathname.split("/")
  const isSearchPage = languageCode === "en" ? firstPath === "search" : secondPath === "search";

  const page = parseInt(searchParams.get(URLSearchParamsKeyword.PAGE) || "1") - 1;
  const sizeQuery = Number(searchParams.get(URLSearchParamsKeyword.SIZE) || defaultParam[URLSearchParamsKeyword.SIZE]);
  
  // Memoize derived state from URL search parameters
  const searchQuery = useMemo(() => searchParams.get(URLSearchParamsKeyword.SEARCH) || "", [searchParams]);
  const filterFields = useMemo(() => generateFilterQuery(searchParams.toString()), [searchParams]);
  const sortFields = useMemo(() => generateSortFields(searchParams.toString()), [searchParams]);

  const urlParams = new URLSearchParams(searchParams.toString());


  const resultsPerPage = sizeQuery ?? defaultParam[URLSearchParamsKeyword.SIZE]

  const setSearchParams = useCallback(
    (queryObject: QueryObject) => {
      Object.keys(queryObject).map((objectKey) => {
        urlParams.set(objectKey, queryObject[objectKey]);
      });
      router.push(pathname + "?" + urlParams.toString());
    },
    [router, urlParams]
  );

  const queryResult = useQuery({
    queryKey: ["query", searchQuery, sizeQuery, filterFields, page, sortFields, languageCode],
    queryFn: () =>
      buildQueryCall({ queryString: searchQuery, size: sizeQuery, page, filterFields, sortFields }, { languageCode }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    enabled: isSearchPage,
  });

  // Function to initiate a new search with the given queryString
  const makeQuery = (queryString: string) => {

    urlParams.delete(URLSearchParamsKeyword.PAGE); // new search query resets the user back to the first page of results
    urlParams.set(URLSearchParamsKeyword.SEARCH, queryString.trim()); // new search query
    console.log({isSearchPage, pathname, urlParams})
    if (isSearchPage) {
      router.push(`${pathname}?${urlParams.toString()}`);
    } else {
      const newUrl = generateNewUrlForLanguage(`/search?${urlParams.toString()}`, languageCode);
      router.push(newUrl);
    }
  };

  // Function to handle page changes in pagination
  const handlePageChange = (page: number) => {
    setSearchParams({ page: JSON.stringify(page) });
  };

  const pagingInfo = {
    resultsPerPage,
    current: page + 1, // Adjust for zero-based index
    totalResults:
      (queryResult.data?.hits?.total["value"] as unknown as number) ?? null,
  };

  return (
    <SearchContext.Provider
      value={{
        queryResult,
        searchQuery,
        page,
        setSearchParams,
        pagingInfo,
        handlePageChange,
        makeQuery,
        filterFields,
        sortFields,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
