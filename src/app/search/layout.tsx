"use client";
import FooterComponent from "@/components/layout/FooterComponent";
import Wrapper from "@/components/layout/Wrapper";
import FilterMenu from "@/components/search/FilterMenu";
import ResultSize from "@/components/search/ResultsSize";
import { Sort } from "@/components/search/Sort";
import { setup } from "@/config";
import { useUIContext } from "@/context/UIContext";
import Facet from "@/components/search/Facet";
import ShowFilterResultsMobile from "@/components/search/ShowFilterResultsMobile";
import { SearchContextProvider } from "./useSearch";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { sidebarToggleManager } = useUIContext();
  return (
    <>
      <SearchContextProvider>
        <section
          data-sb-open={sidebarToggleManager.state}
          className="group mt-2 md:mt-6"
        >
          <Wrapper className="flex gap-[50px] md:pb-[100px] items-start">
            <div className='hidden -translate-x-full w-full md:w-auto md:h-auto md:relative md:block md:translate-x-0 group-data-[sb-open="true"]:block group-data-[sb-open="true"]:translate-x-0'>
              <SearchSidebar />
            </div>
            <div className="w-full scroll-smooth group-data-[sb-open='true']:hidden group-data-[sb-open='true']:md:block">
              {children}
            </div>
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
    }
  };

  return (
    <div className="w-full md:w-[300px] shrink-0 bg-custom-background sticky top-[calc(8px+var(--header-height))] md:top-[calc(24px+var(--header-height))]">
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
