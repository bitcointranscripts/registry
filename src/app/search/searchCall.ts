// use server
import type { LanguageCode } from "@/config";
import { EsSearchResponse, SearchQuery } from "./types";

type BuildQuery = (
  { queryString, size, page, filterFields, sortFields }: SearchQuery,
  { languageCode, url }: { languageCode: LanguageCode, url?: string }
) => Promise<EsSearchResponse>;


export const buildQueryCall: BuildQuery = async (
  { queryString, size, page, filterFields, sortFields },
  { languageCode, url }
) => {
  const body = {
    queryString,
    size,
    page,
    filterFields,
    sortFields,
    languageCode,
  };

  const jsonBody = JSON.stringify(body);

  return fetch(url ?? "/search/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonBody,
  })
    .then(async (res) => {
      const data = await res.json();
      if (!data.success) {
        const errMessage = data.message || "Error while fetching";
        throw new Error(errMessage);
      }
      return data.data;
    })
    .catch((err) => {
      throw new Error(err.message ?? "Error fetching results");
    });
};
