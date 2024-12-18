import React from "react";
import SidebarSection from "./SidebarSection";
import { MultiSelect } from "@bitcoin-dev-project/bdp-ui";
import { FacelLabelMapping } from "@/config";
import { FacetKeys } from "@/app/search/types";
import { useSearch } from "@/app/search/useSearch";
import { unsluggify } from "@/utils";
import useURLManager from "@/service/URLManager/useURLManager";
import { AuthorIcon, SourceIcon } from "@bitcoin-dev-project/bdp-ui/icons";

const Facet = ({ facet }: { facet: FacetKeys }) => {
  const label = FacelLabelMapping[facet];

  const iconMapping = {
    authors: AuthorIcon,
    transcript_source: SourceIcon,
    tags: SourceIcon,
    domain: SourceIcon,
  };

  const { filterFields, queryResult } = useSearch();
  const { toggleFilter } = useURLManager();

  const selectedOptions = filterFields.filter((item) => item.field === facet);

  const options = queryResult.data?.aggregations?.[facet]?.buckets.map((item) => ({
    label: unsluggify(item.key),
    count: item.doc_count,
    value: item.key,
    selected: Boolean(selectedOptions.find((option) => option.value === item.key)),
  }));

  return (
    <>
      <SidebarSection>
        <div className="flex items-center gap-2 text-base 2xl:text-lg font-bold pb-4 2xl:pb-6">
          {iconMapping[facet]({className: "w-[20px]"})}
          <span className="leading-none">{label}</span>
        </div>
        <MultiSelect isCollapsible>
          <MultiSelect.Input defaultPlaceholder={`Select ${label}`} className="bg-gray-custom-100" />
          <MultiSelect.List
            options={options ?? []}
            label="Select options"
            onOptionSelect={({ action, value, event }) => {
              console.log("Clicked toggle filter: ", value);
              toggleFilter({ filterType: facet, filterValue: value });
            }}
            styles={{
              noResults: "text-red-500",
              optionWrapper: "gap-4",
              container: "max-h-[120px] bg-gray-custom-100"
            }}
          />
        </MultiSelect>
      </SidebarSection>
    </>
  );
};

export default Facet;
