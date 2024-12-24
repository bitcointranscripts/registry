import useURLManager from "@/service/URLManager/useURLManager";
import { SingleSelect } from "@bitcoin-dev-project/bdp-ui";
import SidebarSection from "./SidebarSection";
import { SortIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { setup } from "@/config";
import { ArbitraryCallback } from "@/app/search/types";

export const Sort = ({callback} : {callback: ArbitraryCallback}) => {
  const options = [
    { label: "Relevance", value: "" },
    { label: "Newest First", value: "desc" },
    { label: "Oldest First", value: "asc" },
  ];
  const { getSort, addSort, removeSort } = useURLManager();

  const sortField = setup.sortFields[0]

  const handleSortBy = (option: any) => {
    if (option.value === "") {
      removeSort(sortField);
      callback();
      return;
    }
    addSort(sortField, option.value);
  };

  return (
    <SidebarSection className="w-full relative z-[1]">
      <div className="flex items-center gap-2 text-base 2xl:text-lg font-bold pb-4 2xl:pb-6">
        <SortIcon className="w-[20px]" />
        <span className="leading-none">Sort By</span>
      </div>
      <SingleSelect>
        <SingleSelect.Trigger
          defaultPlaceholder={
            options.find((option) => option.value === getSort(sortField))
              ?.label ?? "Relevance"
          }
          className="bg-gray-custom-100 font-bold"
        />
        <SingleSelect.List
          options={options}
          label="Sort by"
          onOptionSelect={handleSortBy}
          value={getSort(sortField) || ""}
        />
      </SingleSelect>
    </SidebarSection>
  );
};
