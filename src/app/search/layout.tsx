"use client";
import FooterComponent from "@/components/layout/FooterComponent";
import Wrapper from "@/components/layout/Wrapper";
import FilterMenu, { FilterMenuMobile } from "@/components/search/FilterMenu";
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
          id="search-page"
          data-sb-open={sidebarToggleManager.state}
          className="group scroll-smooth max-h-[calc(100svh-var(--header-height)-2px)] overflow-auto"
        >
          <Wrapper className="flex gap-[50px] pb-[100px] items-start">
            {/* <div className='hidden -translate-x-full w-full md:w-auto md:h-auto md:relative md:block md:translate-x-0 group-data-[sb-open="true"]:block group-data-[sb-open="true"]:translate-x-0'> */}
              <SearchSidebar />
            {/* </div> */}
            {sidebarToggleManager.state ? null :
              <div className="w-full group-data-[sb-open='true']:hidden group-data-[sb-open='true']:md:block">
                <FilterMenuMobile />
                {children}
              </div>
            }
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
        element.scrollTo({top: 5, behavior: 'smooth'});
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
