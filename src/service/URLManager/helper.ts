import { URLSearchParamsKeyword } from "@/config";
import { setup } from "@/config";
import { Facet, FacetKeys } from "@/app/search/types";

export const appendFilterName = (filterType: string) => {
  return `${URLSearchParamsKeyword.FILTER}_${filterType}`;
};

export const appendSortName = (sortField: string) => {
  return `${URLSearchParamsKeyword.SORT}_${sortField}`;
};

export function generateFilterQuery(searchParams: string) {
  const filterList: Facet[] = [];
  const urlParams = new URLSearchParams(searchParams);
  setup.facetFields.map((field) => {
    const name = appendFilterName(field);
    urlParams.getAll(name).forEach((value) => {
      filterList.push({ field: field as FacetKeys, value });
    });
  });
  return filterList;
}

export function generateSortFields(searchParams: string) {
  const sortList: {field: string, value: string}[] = [];
  const urlParams = new URLSearchParams(searchParams);
  setup.sortFields.map((field) => {
    const name = appendSortName(field);
    urlParams.getAll(name).forEach((value) => {
      const pair = getSortPairFromValue(value);
      pair && sortList.push(pair);
    });
  });
  return sortList;
}

function getSortPairFromValue(sort: string) {
  const [field, value] = sort.split(":");
  if (!field || !value) return null;
  return {
    field,
    value,
  };
}
