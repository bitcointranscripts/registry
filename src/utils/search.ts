import topics from "@/public/topics.json";
import { Facet } from "@/app/search/types";
import { getTopicTitle } from "./topic";
import { Topic } from "@/types";

export const getFilterDisplayName = ({ field, value }: Facet) => {
  if (field === "tags") {
    return getTopicTitle(value, topics as Topic[]);
  }
  return value;
};
