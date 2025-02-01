import { useSearch } from "@/app/search/useSearch";
import React from "react";
import SidebarSection from "./SidebarSection";
import useLang from "@/hooks/useLang";
import useTranslations from "@/hooks/useTranslations";

const ResultSize = () => {
  const lang = useLang();
  const t = useTranslations(lang);

  const {
    resultsPerPage: currentSize,
    totalResults,
    current,
  } = useSearch().pagingInfo;

  const range = {
    start: Math.max(currentSize * (current - 1), 1),
    end: Math.min(currentSize * current, totalResults ?? 1),
  };
  return (
    <>
      <SidebarSection className=" hidden lg:block border-none">
        <div className="flex flex-wrap items-center gap-2 pb-2 md:pb-4 text-custom-primary-text text-sm lg:text-base">
          <span>{t("search.result-size.showing")}</span>
          <span className="font-bold">
            {range.start} - {range.end}
          </span>
          {t("search.result-size.of")} <span className="font-bold">{totalResults}</span> {t("search.result-size.results")}
        </div>
        <svg className="text-gray-custom-400" height="2" width="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </SidebarSection>
    </>
  );
};

export default ResultSize;
