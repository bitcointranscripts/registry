import React from "react";
import TranscriptContentPage from "@/components/explore/TranscriptContentPage";
import allSources from "@/public/source-count-data.json";

const SourcesPage = () => {
  return (
    <div className='flex flex-col text-black'>
      <TranscriptContentPage
        header='Sources'
        data={allSources}
        description='Sources help you find transcripts within a specific talk, meetup, conference, and the likes.'
        type='alphabet'
        linkName='sources'
      />
    </div>
  );
};

export default SourcesPage;
