import { Transcript } from "contentlayer/generated";
import fs from "fs";
import path from "path";
import { getTags } from "@/utils";

export interface CategoryInfo {
  title: string;
  slug: string;
  optech_url: string;
  categories: string[];
  aliases?: string[];
  excerpt: string;
}

interface TagInfo {
  title: string;
  slug: string;
  count: number;
}

export function getCategories(): CategoryInfo[] {
  const filePath = path.join(process.cwd(), "public", "categories.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function organizeTags(
  transcripts: Transcript[],
  categories: CategoryInfo[]
) {
  const tagsByCategory: { [category: string]: TagInfo[] } = {};
  const tagsWithoutCategory = new Set<string>();

  // Load the precomputed tag counts
  const tagCounts = getTags();
  const categorizedTags = new Set<string>();

  // Initialize categories
  categories.forEach((cat) => {
    cat.categories.forEach((category) => {
      if (!tagsByCategory[category]) {
        tagsByCategory[category] = [];
      }
    });
  });

  // Categorize tags
  transcripts.forEach((transcript) => {
    const tags = transcript.tags || [];
    tags.forEach((tag) => {
      let categorized = false;
      categories.forEach((catInfo) => {
        if (
          catInfo.slug === tag ||
          (catInfo.aliases && catInfo.aliases.includes(tag))
        ) {
          catInfo.categories.forEach((category) => {
            if (!tagsByCategory[category].some((t) => t.slug === tag)) {
              tagsByCategory[category].push({
                title: catInfo.title,
                slug: tag,
                count: tagCounts[tag] || 0,
              });
            }
          });
          categorized = true;
          categorizedTags.add(tag);
        }
      });
      if (!categorized) {
        tagsWithoutCategory.add(tag);
      }
    });
  });

  // TODO: Implement logic for handling miscellaneous/catch-all tags for specific categories
  // When a transcript belongs to a category but doesn't have a specific tag under that category,
  // assign it to the category by using a category-specific miscellaneous tag.
  // This will ensure that transcripts are properly categorized even when they don't match
  // existing specific tags within a category.

  // Add "Miscellaneous" category with remaining uncategorized tags
  if (tagsWithoutCategory.size > 0) {
    tagsByCategory["Miscellaneous"] = Array.from(tagsWithoutCategory).map(
      (tag) => ({
        title: tag,
        slug: tag,
        count: tagCounts[tag] || 0,
      })
    );
  }

  // Sort tags alphabetically within each category
  Object.keys(tagsByCategory).forEach((category) => {
    tagsByCategory[category].sort((a, b) => a.title.localeCompare(b.title));
  });

  return { tagsByCategory, tagsWithoutCategory };
}
