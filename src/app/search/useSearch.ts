import { useQuery } from "@tanstack/react-query";
import { buildQueryCall } from "./searchCall";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { defaultParam, URLSearchParamsKeyword } from "@/config";
import { useCallback, useMemo } from "react";
import { generateFilterQuery, generateSortFields } from "@/service/URLManager/helper";

/**
 * Custom React hook for performing search queries against an Elasticsearch backend via a proxy endpoint.
 * Utilizes React Query's `useQuery` to manage fetching, caching, and updating of search results.
 */

export type QueryObject = Record<string, string>;

export const useSearch = () => {
  const router = useRouter();
  // const searchParams = router.query;

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rawSearchQuery = searchParams.get(URLSearchParamsKeyword.SEARCH) || "";
  const page = parseInt(searchParams.get(URLSearchParamsKeyword.PAGE) || "1") - 1;
  const sizeQuery = Number(searchParams.get(URLSearchParamsKeyword.SIZE) || defaultParam[URLSearchParamsKeyword.SIZE]);

  const filterFields = useMemo(() => generateFilterQuery(searchParams.toString()), [searchParams]);
  const sortFields = useMemo(() => generateSortFields(searchParams.toString()), [searchParams]);

  const urlParams = new URLSearchParams(searchParams.toString());

  // Memoize derived state from URL search parameters
  const searchQuery = useMemo(() => {
    return rawSearchQuery ?? "";
  }, [rawSearchQuery]);

  const resultsPerPage = sizeQuery ?? defaultParam[URLSearchParamsKeyword.SIZE]

  const setSearchParams = useCallback(
    (queryObject: QueryObject) => {
      Object.keys(queryObject).map((objectKey) => {
        urlParams.set(objectKey, queryObject[objectKey]);
      });
      router.push(pathname + "?" + urlParams.toString(), {scroll: true});
    },
    [router, urlParams]
  );

  console.log({sortFields})

  const queryResult = useQuery({
    queryKey: ["query", searchQuery, sizeQuery, filterFields, page, sortFields],
    queryFn: () =>
      buildQueryCall({ queryString: searchQuery, size: sizeQuery, page, filterFields, sortFields }),
    // cacheTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    enabled: true,
  });

  // Function to initiate a new search with the given queryString
  const makeQuery = (queryString: string) => {

    urlParams.delete(URLSearchParamsKeyword.PAGE); // new search query resets the user back to the first page of results
    urlParams.set(URLSearchParamsKeyword.SEARCH, queryString.trim()); // new search query
    if (pathname.includes("search")) {
      router.push(`${pathname}?${urlParams.toString()}`,{
        scroll: true,
      });
    } else {
      router.push(`/search?${urlParams.toString()}`)
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

  return {queryResult, searchQuery, page, setSearchParams, pagingInfo, handlePageChange, makeQuery, filterFields, sortFields};
};
