"use client";

import React from "react";
import Pagination from "@/components/search/Pagination";
import SearchResultCard from "@/components/search/SearchResultCard";
import { useSearch } from "./useSearch";
import NotFound from "../not-found";
import { SkeletonResults } from "@/components/search/Loader";

const SearchPage = () => {
  const { queryResult } = useSearch();

  const isLoading = queryResult.isLoading;
  const isError = queryResult.isError;

  const searchResults = queryResult.data?.hits?.hits;

  const totalResults = queryResult.data?.hits?.total?.value;

  const noResults = totalResults === 0;

  if (isLoading) {
    return (
      <div className="mt-4">
        <SkeletonResults count={4} />;
      </div>
    );
  }

  if (isError) {
    return <div>Error: {queryResult.error.message}</div>;
  }

  if (noResults) {
    return <NotFound />;
  }

  return (
    <>
      <div className="flex flex-col gap-2 2xl:max-w-[1024px]">
        {searchResults?.map((result) => (
          <SearchResultCard
            result={result._source}
            className={queryResult.isFetching ? "animate-pulse" : ""}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Pagination />
      </div>
    </>
  );
};

export default SearchPage;
