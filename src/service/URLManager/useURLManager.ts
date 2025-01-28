import { FacetKeys } from "@/app/search/types";
import { appendFilterName, appendSortName } from "./helper";
import { URLSearchParamsKeyword } from "@/config";
import { useRouter, useSearchParams } from "next/navigation";
import useLang from "@/hooks/useLang";
import { generateNewUrlForLanguage } from "@/utils/locale";

type FilterProp = {
  filterType: FacetKeys;
  filterValue: string;
  multiSelect?: boolean;
};

const useURLManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lang = useLang()

  const basePath = "/search";

  const urlParams = new URLSearchParams(searchParams.toString());

  const getSearchTerm = () => {
    return urlParams.get(URLSearchParamsKeyword["SEARCH"]);
  };

  const getFilter = (filterType: FacetKeys) => {
    return urlParams.getAll(appendFilterName(filterType));
  };

  const getSort = (sortField: string) => {
    return urlParams.get(appendSortName(sortField));
  };

  const removePageQueryParams = (urlParams: URLSearchParams) => {
    urlParams.delete(URLSearchParamsKeyword["PAGE"]);
  };

  const addSortParams = (sortField: string, value: string) => {
    urlParams.set(appendSortName(sortField), value);
    return urlParams.toString();
  };
  const removeSortParams = (sortField: string) => {
    urlParams.delete(appendSortName(sortField));
    return urlParams.toString();
  };

  const addFilterFromParams = ({
    filterType,
    filterValue,
    multiSelect = true,
  }: FilterProp) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const currentFilterForType = urlParams.getAll(appendFilterName(filterType));
    if (currentFilterForType.includes(filterValue)) return null;
    removePageQueryParams(urlParams);
    if (multiSelect) {
      urlParams.append(appendFilterName(filterType), filterValue);
    } else {
      urlParams.set(appendFilterName(filterType), filterValue);
    }
    return urlParams.toString();
  };

  const removeFilterFromParams = ({
    filterType,
    filterValue,
    multiSelect = true,
  }: FilterProp) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const appendedFilterName = appendFilterName(filterType);
    const currentFilterForType = urlParams.getAll(appendedFilterName);
    if (!currentFilterForType.length) return null;

    const filterValueIndex = currentFilterForType.findIndex(
      (value) => value === filterValue
    );
    if (filterValueIndex !== -1) {
      removePageQueryParams(urlParams);
      currentFilterForType.splice(filterValueIndex, 1);
      urlParams.delete(appendedFilterName);
      if (multiSelect) {
        for (let i = 0; i < currentFilterForType.length; i++) {
          urlParams.append(appendedFilterName, currentFilterForType[i]);
        }
      }
      return urlParams.toString();
    }
  };

  const toggleFilterFromParams = ({ filterType, filterValue, multiSelect = true }: FilterProp) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const currentFilterForType = urlParams.getAll(appendFilterName(filterType));
    if (currentFilterForType.includes(filterValue)) {
      return removeFilterFromParams({ filterType, filterValue, multiSelect });
    } else {
      return addFilterFromParams({ filterType, filterValue, multiSelect });
    }
  }

  const addSort = (sortField: string, value: string) => {
    const params = addSortParams(sortField, value);
    const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
    router.push(newUrl);
  };

  const removeSort = (sortField: string) => {
    const params = removeSortParams(sortField);
    const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
    router.push(newUrl);
  };

  const addFilter = ({
    filterType,
    filterValue,
    multiSelect = true,
  }: FilterProp) => {
    const params = addFilterFromParams({
      filterType,
      filterValue,
      multiSelect,
    });
    if (params !== null) {
      const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
      router.push(newUrl);
    }
  };

  const removeFilter = ({
    filterType,
    filterValue,
    multiSelect = true,
  }: FilterProp) => {
    const params = removeFilterFromParams({
      filterType,
      filterValue,
      multiSelect,
    });
    if (params !== null) {
      const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
      router.push(newUrl);
    }
  };

  const toggleFilter = ({
    filterType,
    filterValue,
    multiSelect = true,
  }: FilterProp) => {
    const currentFilterForType = urlParams.getAll(appendFilterName(filterType));
    if (currentFilterForType.includes(filterValue)) {
      removeFilter({ filterType, filterValue, multiSelect });
    } else {
      addFilter({ filterType, filterValue, multiSelect });
    }
  };

  const clearAllFilters = () => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const paramKeys = Array.from(urlParams.keys());
    for (const key of paramKeys) {
      if (key.startsWith("filter")) {
        urlParams.delete(key);
      }
    }
  };

  const removeFilterTypes = ({
    filterTypes,
    sortField,
  }: {
    filterTypes: FacetKeys[];
    sortField: string;
  }) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    filterTypes.forEach((filterType) => {
      const appendedFilterName = appendFilterName(filterType);
      const currentFilterForType = urlParams.getAll(appendedFilterName);
      if (!currentFilterForType.length) return;
      urlParams.delete(appendedFilterName);
    });

    removeSortParams(sortField);
    removePageQueryParams(urlParams);
    const params = urlParams.toString();
    const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
    router.push(newUrl);
  };

  const setResultsSize = (size: number) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set(URLSearchParamsKeyword.SIZE, size.toString());
    const params = urlParams.toString();
    const newUrl = generateNewUrlForLanguage(basePath + `${params ? "?" + params : params}`, lang);
    router.push(newUrl);
  };

  return {
    addFilter,
    addFilterFromParams,
    toggleFilterFromParams,
    removeFilter,
    getFilter,
    clearAllFilters,
    removeFilterTypes,
    getSearchTerm,
    getSort,
    addSort,
    removeSort,
    setResultsSize,
    toggleFilter,
  };
};

export default useURLManager;
