import { unsluggify } from "@/utils";
import topics from "@/public/topics.json"

export const getTopicTitle = (slug: string) => {
  const title = topics.find(topic => topic.slug === slug || topic.aliases?.includes(slug))?.title
  if (title) return title;
  const saneCapitalization = unsluggify(slug).split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")
  return saneCapitalization;
}
