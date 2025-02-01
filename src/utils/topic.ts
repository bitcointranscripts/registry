import { Topic } from "@/types";
import { saneCapitalization } from ".";

export const getTopicTitle = (slug: string, topics: Topic[]) => {
  let title = "";
  const foundTitle = topics.find(
    (topic) => topic.slug === slug || topic.aliases?.includes(slug)
  )?.title;
  if (foundTitle && foundTitle?.includes("(Miscellaneous)")) {
    title = foundTitle.replace("(Miscellaneous)", "");
  } else if (foundTitle) {
    title = foundTitle;
  } else {
    title = saneCapitalization(slug);
  }

  return title;
};