import React from "react";

import { setup } from "@/config";
import useURLManager from "@/service/URLManager/useURLManager";
import {
  FilterIcon,
  CloseIconOutlined,
} from "@bitcoin-dev-project/bdp-ui/icons";
import { useSearch } from "@/app/search/useSearch";
import SidebarSection from "./SidebarSection";
import { ArbitraryCallback, Facet } from "@/app/search/types";
import { useUIContext } from "@/context/UIContext";
import { getFilterDisplayName } from "@/utils/search";
import useLang from "@/hooks/useLang";
import useTranslations from "@/hooks/useTranslations";

export const FilterMenuMobile = ({ filterHeadingText }: {filterHeadingText: string}) => {
  const { sidebarToggleManager } = useUIContext();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    sidebarToggleManager.updater();
    const element = document.getElementById("search-page");
    if (element) {
      element.scrollTo({top: 5, behavior: 'smooth'});
    }
  }
  return (
    <div className="flex md:hidden items-center gap-2 justify-between py-2 sticky top-[0px] bg-white">
      <p className="text-[14px] font-bold">{filterHeadingText}</p>
      <button
        className="mr-2 active:scale-90 p-1"
        onClick={(e) => handleClick(e)}
      >
        <FilterIcon
          className="w-5 h-5"
        />
      </button>
    </div>
  );
};

const FilterMenu = ({ callback }: { callback: ArbitraryCallback }) => {
  const { filterFields } = useSearch();

  const lang = useLang();

  const t = useTranslations(lang);

  return (
    <>
      {/* Mobile filter menu */}
      <div className="md:hidden w-full">
        <FilterMenuMobile filterHeadingText={t("search.filters.title")?? ""} />
      </div>
      <SidebarSection className="hidden md:flex w-full text-custom-primary-text justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-[20px] hidden md:flex" />
          <p className="text-base 2xl:text-lg font-bold leading-none">
            {t("search.filters.title")}
          </p>
        </div>
      </SidebarSection>
      <AppliedFilters filters={filterFields} callback={callback} t={t} />
    </>
  );
};

const AppliedFilters = ({
  filters,
  callback,
  t,
}: {
  filters: Facet[];
  callback: ArbitraryCallback;
  t: ReturnType<typeof useTranslations>;
}) => {
  const { removeFilterTypes, removeFilter } = useURLManager();
  if (!filters?.length) return null;
  const clearAllFilters = () => {
    removeFilterTypes({
      filterTypes: setup.facetFields,
      sortField: setup.sortFields[0],
    });
    callback();
  };
  return (
    <SidebarSection className="text-custom-primary-text">
      <div className="flex justify-between mb-4 2xl:mb-6">
        <p className="text-sm 2xl:text-base font-bold">{t("search.filters.applied")}</p>
        <div
          className="flex gap-2 items-center group/applied-filters"
          role="button"
          onClick={clearAllFilters}
        >
          <span className="text-sm 2xl:text-base group-hover/applied-filters:underline underline-offset-4">
            {t("search.clear-all")}
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
                className="flex gap-3 w-fit py-[10px] px-3 2xl:py-3 2xl:px-4 bg-custom-accent text-custom-white dark:text-custom-background rounded-lg transform transition-all hover:scale-95 active:scale-90"
                role="button"
                onClick={() => {
                  removeFilter({
                    filterType: filter.field,
                    filterValue: filter.value,
                  });
                  callback();
                }}
              >
                <span className="capitalize text-sm font-semibold 2xl:text-sm">
                  {getFilterDisplayName({ field: filter.field, value: filter.value })}
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
