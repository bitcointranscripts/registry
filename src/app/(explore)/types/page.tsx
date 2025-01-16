import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTypesData from "@/public/types-data.json";
import { createContentSlug, ExploreGroupedData, FieldCountItem } from "@/utils";

const CategoriesPage = () => {
  const allTypes = allTypesData as Record<string, FieldCountItem[]>;
  let reStructuredTypes: ExploreGroupedData[] = [];
  for (let key in allTypes) {
    reStructuredTypes.push({
      name: key,
      slug: createContentSlug(key),
      nested: allTypes[key],
    });
  }
  return (
    <div className="flex flex-col text-black">
      <TranscriptContentPage
        header="Types"
        data={reStructuredTypes}
        description="Sources tend to fall into discrete types, from podcasts to meetups. Find transcripts in your preferred format of communication."
        type="words"
        linkName="sources"
      />
    </div>
  );
};

export default CategoriesPage;
