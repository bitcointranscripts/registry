import useURLManager from "@/service/URLManager/useURLManager";
import { SingleSelect } from "@bitcoin-dev-project/bdp-ui";
import SidebarSection from "./SidebarSection";
import { SortIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { setup } from "@/config";
import { ArbitraryCallback } from "@/app/search/types";
import useLang from "@/hooks/useLang";
import useTranslations from "@/hooks/useTranslations";

export const Sort = ({callback} : {callback: ArbitraryCallback}) => {
  const lang = useLang();
  const t = useTranslations(lang);

  const options = [
    { label: t("search.sort.relevance")!, value: "" },
    { label: t("search.sort.newest")!, value: "desc" },
    { label: t("search.sort.oldest")!, value: "asc" },
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
        <span className="leading-none">{t("search.sort.title")}</span>
      </div>
      <SingleSelect>
        <SingleSelect.Trigger
          defaultPlaceholder={
            options.find((option) => option.value === getSort(sortField))
              ?.label ?? t("search.sort.relevance")!
          }
          className="bg-gray-custom-100 font-bold"
        />
        <SingleSelect.List
          options={options}
          label={t("search.sort.title")!}
          onOptionSelect={handleSortBy}
          value={getSort(sortField) || ""}
        />
      </SingleSelect>
    </SidebarSection>
  );
};
