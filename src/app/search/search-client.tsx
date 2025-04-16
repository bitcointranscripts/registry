"use client";
import FooterComponent from "@/components/layout/FooterComponent";
import Wrapper from "@/components/layout/Wrapper";
import FilterMenu, { FilterMenuMobile } from "@/components/search/FilterMenu";
import ResultSize from "@/components/search/ResultsSize";
import { Sort } from "@/components/search/Sort";
import { LanguageCode, setup } from "@/config";
import { useUIContext } from "@/context/UIContext";
import Facet from "@/components/search/Facet";
import ShowFilterResultsMobile from "@/components/search/ShowFilterResultsMobile";
import { SearchContextProvider, useSearch } from "@/app/search/useSearch";
import Pagination from "@/components/search/Pagination";
import SearchResultCard from "@/components/search/SearchResultCard";
import NotFound from "@/app/not-found";
import { SkeletonResults } from "@/components/search/Loader";
import useTranslations from "@/hooks/useTranslations";
import { unsluggify } from "@/utils";

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
    return <NotFound searchPage/>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 2xl:max-w-[1024px]">
        {searchResults?.map((result) => (
          <SearchResultCard
            key={result._id}
            result={result._source}
            className={queryResult.isFetching ? "animate-pulse" : ""}
          />
        ))}
        <div className="flex justify-center pt-8">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default function SearchClient({
  languageCode,
}: {
  languageCode: LanguageCode;
}) {
  const { sidebarToggleManager } = useUIContext();
  const t = useTranslations(languageCode);
  return (
    <>
      <SearchContextProvider>
        <section
          id="search-page"
          data-sb-open={sidebarToggleManager.state}
          className="group scroll-smooth max-h-[calc(100svh-var(--header-height)-2px)] overflow-auto"
        >
          <Wrapper className="flex gap-[50px] pb-[100px] items-start">
            {/* <div className='hidden -translate-x-full w-full md:w-auto md:h-auto md:relative md:block md:translate-x-0 group-data-[sb-open="true"]:block group-data-[sb-open="true"]:translate-x-0'> */}
            <SearchSidebar />
            {/* </div> */}
            {sidebarToggleManager.state ? null : (
              <div className="w-full group-data-[sb-open='true']:hidden group-data-[sb-open='true']:md:block">
                <FilterMenuMobile filterHeadingText={t("search.filters.title")?? ""} />
                <SearchPage />
              </div>
            )}
          </Wrapper>
          <FooterComponent />
        </section>
      </SearchContextProvider>
    </>
  );
}

const SearchSidebar = () => {
  const { sidebarToggleManager } = useUIContext();
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 600px)").matches;

  const callback = () => {
    if (isMobile) {
      sidebarToggleManager.updater(false);
      const element = document.getElementById("search-page");
      if (element) {
        element.scrollTo({ top: 5, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="hidden md:block group-data-[sb-open='true']:block w-full md:w-[300px] shrink-0 bg-custom-background">
      <ResultSize />
      <FilterMenu callback={callback} />
      <Sort callback={callback} />
      {setup.facetFields.map((field) => (
        <Facet key={field} facet={field} callback={callback} />
      ))}
      <ShowFilterResultsMobile callback={callback} />
    </div>
  );
};
