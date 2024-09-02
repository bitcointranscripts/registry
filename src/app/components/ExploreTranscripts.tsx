"use server";

import React from "react";
import path from "path";
import * as fs from "fs";
import { Wrapper, ExploreTranscriptClient } from ".";
import { Transcript } from "../../../.contentlayer/generated/types";
import { allTranscripts } from "contentlayer/generated";

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

const getCategories = () => {
  const filePath = path.join(process.cwd(), "public", "categories.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

function getTags(): {
  [key: string]: number;
} {
  const filePath = path.join(process.cwd(), "public", "tag-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

const getTypes = (): { [key: string]: number } => {
  const filePath = path.join(process.cwd(), "public", "types-data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
};

function organizeTags(transcripts: Transcript[], categories: CategoryInfo[]) {
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
        if (catInfo.slug === tag || (catInfo.aliases && catInfo.aliases.includes(tag))) {
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
    tagsByCategory["Miscellaneous"] = Array.from(tagsWithoutCategory).map((tag) => ({
      title: tag,
      slug: tag,
      count: tagCounts[tag] || 0,
    }));
  }

  // Sort tags alphabetically within each category
  Object.keys(tagsByCategory).forEach((category) => {
    tagsByCategory[category].sort((a, b) => a.title.localeCompare(b.title));
  });

  return { tagsByCategory, tagsWithoutCategory };
}

const ExploreTranscripts = () => {
  const categories = getCategories();
  const types = getTypes();
  const { tagsByCategory } = organizeTags(allTranscripts, categories);

  return (
    <Wrapper className='py-[104px] flex flex-col gap-14 text-black max-md:py-16 max-md:gap-12'>
      <h2 className='2xl:text-[72px] text-[64px] leading-[90px] text-center font-medium max-xl:text-5xl max-xl:leading-[130%] max-[953px]:text-[38px] max-[953px]:leading-[130%] max-md:text-[36px] max-sm:leading-[48px]'>
        Explore Transcripts
      </h2>
      <ExploreTranscriptClient categories={tagsByCategory} types={types} />
    </Wrapper>
  );
};

export default ExploreTranscripts;
