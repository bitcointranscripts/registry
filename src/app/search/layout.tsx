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

export default function BaseLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="mt-2 md:mt-6">
        <Wrapper className="flex gap-[50px] md:pb-[100px] items-start">
          <SearchSidebar />
          <div className="w-full scroll-smooth">{children}</div>

          {/* Include shared UI here e.g. a header or sidebar */}
        </Wrapper>
        <FooterComponent />
      </section>
    </>
  );
}

const SearchSidebar = () => {
  const { sidebarToggleManager } = useUIContext();
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches;

  const callback = () => {
    if (isMobile) {
      sidebarToggleManager.updater(false);
    }
  };

  return (
    <div className="w-full shrink-0 md:w-[300px] bg-custom-background sticky top-[calc(8px+var(--header-height))] md:top-[calc(24px+var(--header-height))]">
      <ResultSize />
      <FilterMenu />
      <Sort />
      {/* <SortingFacet
        field="sort_by"
        label="Sort by"
        view={SortingView}
        sortOptions={[
          { label: "Relevance", value: " " },
          {
            label: "Newest First",
            value: "created_at:desc",
          },
          {
            label: "Oldest First",
            value: "created_at:asc",
          },
        ]}
        callback={sortCallback}
      /> */}
      {setup.facetFields.map((field) => (
        <Facet key={field} facet={field} />
      ))}
      {/* <ShowFilterResultsMobile /> */}
    </div>
  );
}
