import React from "react";

import { setup } from "@/config";
// import { getFilterValueDisplay } from "@/utils/search";
import useURLManager from "@/service/URLManager/useURLManager";
import { FilterIcon, CloseIconOutlined } from "@bitcoin-dev-project/bdp-ui/icons";
import { useSearch } from "@/app/search/useSearch";
import SidebarSection from "./SidebarSection";
import { Facet } from "@/app/search/types";
import { useUIContext } from "@/context/UIContext";

const FilterMenu = () => {
  const { filterFields } = useSearch();
  const { sidebarToggleManager } = useUIContext();

  return (
    <>
      <SidebarSection className="text-custom-primary-text flex justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-[20px] hidden md:flex"/>
          <p className="text-base 2xl:text-lg font-bold leading-none">Filters</p>
        </div>
        <button className="md:hidden" onClick={() => sidebarToggleManager.updater()}>
          <FilterIcon className="w-5 h-5 mr-2 active:scale-95" />
        </button>
      </SidebarSection>
      <AppliedFilters filters={filterFields} />
    </>
  );
};

const AppliedFilters = ({ filters }: { filters: Facet[] }) => {
  const { removeFilterTypes, removeFilter } = useURLManager();
  if (!filters?.length) return null;
  const clearAllFilters = () => {
    removeFilterTypes({
      filterTypes: setup.facetFields,
      sortField: setup.sortFields[0],
    });
  };
  return (
    <SidebarSection className="text-custom-primary-text">
      <div className="flex justify-between mb-4 2xl:mb-6">
        <p className="text-sm 2xl:text-base font-bold">Applied Filters</p>
        <div
          className="flex gap-2 items-center group/applied-filters"
          role="button"
          onClick={clearAllFilters}
        >
          <span className="text-sm 2xl:text-base group-hover/applied-filters:underline underline-offset-4">
            Clear all
          </span>
          <span className="p-[6px] 2xl:p-2 bg-custom-primary-text rounded-md">
            <CloseIconOutlined className="text-custom-white group-hover/applied-filters:transform group-hover/applied-filters:scale-90 transition-all" />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {setup.facetFields.map((facet) => {
          return filters
            .filter((filter) => filter.field === facet)
            .map((filter) => (
              <div
                key={filter.field}
                className="flex gap-3 w-fit py-[10px] px-3 2xl:py-3 2xl:px-4 bg-custom-accent text-custom-white dark:text-custom-background rounded-lg transform hover:scale-95 transition-all active:scale-90"
                role="button"
                onClick={() =>
                  removeFilter({
                    filterType: filter.field,
                    filterValue: filter.value,
                  })
                }
              >
                <span className="capitalize text-sm font-semibold 2xl:text-sm">
                  {/* {getFilterValueDisplay(filter.value, filter.field)} */}
                  {filter.value}
                </span>
                <CloseIconOutlined />
              </div>
            ));
        })}
      </div>
    </SidebarSection>
  );
};

export default FilterMenu;
