import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allTypesData from "@/public/types-data.json";

const CategoriesPage = () => {
  return (
    <div className='flex flex-col text-black'>
      <TranscriptContentPage
        header='Types'
        data={allTypesData}
        description='Sources tend to fall into discrete types, from podcasts to meetups. Find transcripts in your preferred format of communication.'
        type='words'
        linkName='sources'
      />
    </div>
  );
};

export default CategoriesPage;
