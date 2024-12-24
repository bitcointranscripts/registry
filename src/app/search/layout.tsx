"use client";
import ExploreNavigation from "@/components/explore/ExploreNavigation";
import FooterComponent from "@/components/layout/FooterComponent";
import Wrapper from "@/components/layout/Wrapper";
import FilterMenu from "@/components/search/FilterMenu";
import ResultSize from "@/components/search/ResultsSize";
import SidebarSection from "@/components/search/SidebarSection";
import { Sort } from "@/components/search/Sort";
import { setup } from "@/config";
import { useUIContext } from "@/context/UIContext";
import { MultiSelect } from "@bitcoin-dev-project/bdp-ui";
import { FacetKeys } from "./types";
import Facet from "@/components/search/Facet";
import ShowFilterResultsMobile from "@/components/search/ShowFilterResultsMobile";

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { sidebarToggleManager } = useUIContext();
  return (
    <>
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
      <FilterMenu />
      <Sort />
      {setup.facetFields.map((field) => (
        <Facet key={field} facet={field} />
      ))}
      <ShowFilterResultsMobile callback={callback} />
    </div>
  );
};
