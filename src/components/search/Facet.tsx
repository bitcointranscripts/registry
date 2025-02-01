import React from "react";
import SidebarSection from "./SidebarSection";
import { MultiSelect } from "@bitcoin-dev-project/bdp-ui";
import { FacelLabelMapping } from "@/config";
import { ArbitraryCallback, FacetKeys } from "@/app/search/types";
import { useSearch } from "@/app/search/useSearch";
import { unsluggify } from "@/utils";
import useURLManager from "@/service/URLManager/useURLManager";
import { AuthorIcon, SourceIcon } from "@bitcoin-dev-project/bdp-ui/icons";
import { getTopicTitle } from "@/utils/topic";
import useLang from "@/hooks/useLang";
import useTranslations from "@/hooks/useTranslations";
import topics from "@/public/topics.json";
import { Topic } from "@/types";

const Facet = ({ facet, callback }: { facet: FacetKeys, callback: ArbitraryCallback }) => {
  const lang = useLang();
  const t = useTranslations(lang);

  const label = FacelLabelMapping[facet];
  const labelByLanguage = t(`shared.${label}`) ?? label

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
    label: facet === 'tags' ? getTopicTitle(item.key, topics as Topic[]) : unsluggify(item.key),
    count: item.doc_count,
    value: item.key,
    selected: Boolean(selectedOptions.find((option) => option.value === item.key)),
  }));

  const isLoading = queryResult.isLoading;

  return (
    <>
      <SidebarSection>
        <div className="flex items-center gap-2 text-base 2xl:text-lg font-bold pb-4 2xl:pb-6">
          {iconMapping[facet]({className: "w-[20px]"})}
          <span className="leading-none">{labelByLanguage}</span>
        </div>
        <MultiSelect isCollapsible>
          <MultiSelect.Input defaultPlaceholder={t(`search.${label}.select`) ?? ""} className="bg-gray-custom-100" />
          <MultiSelect.List
            options={options ?? []}
            label="Select options"
            onOptionSelect={({ action, value, event }) => {
              toggleFilter({ filterType: facet, filterValue: value });
              callback();
            }}
            styles={{
              noResults: `${isLoading ? "hidden" : "text-gray-custom-200"}`,
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
