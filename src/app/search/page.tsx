"use client";

import React from "react";
import Pagination from "@/components/search/Pagination";
import SearchResultCard from "@/components/search/SearchResultCard";
import { useSearch } from "./useSearch";
import NotFound from "../not-found";
import { FilterIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { useUIContext } from "@/context/UIContext";


const SearchPage = () => {
  const { queryResult } = useSearch()

  const { sidebarToggleManager } = useUIContext();

  const isLoading = queryResult.isLoading;
  const isError = queryResult.isError;

  const searchResults = queryResult.data?.hits?.hits;

  const totalResults = queryResult.data?.hits?.total?.value;

  const noResults = totalResults === 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {queryResult.error.message}</div>;
  }

  if (noResults) {
    return <NotFound />
  }

  return (
    <>
      <div className="flex md:hidden items-center gap-2 justify-between py-2 sticky top-[84px] bg-white">
        <p className="text-[14px] font-bold">Filters</p>
        <FilterIcon className="w-5 h-5 mr-2 active:scale-95" onClick={() => sidebarToggleManager.updater()} />
      </div>
      <div className="flex flex-col gap-2">
        {searchResults?.map((result) => <SearchResultCard key={result._id} result={result._source} />)}
      </div>
      <div className="flex justify-center pt-8">
        <Pagination />
      </div>
    </>
  );
};

export default SearchPage; 