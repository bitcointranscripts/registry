import React from 'react'
import SingleTranscriptContent from './SingleTranscriptContent'

const GroupedTranscriptContent = ({
  topicsByAlphabet,
}: IGroupedTranscriptContent) => {

  return (
    <div id={topicsByAlphabet.letter.toLowerCase()} className="flex flex-col gap-7">
      <h4 className="font-bold text-2xl">{topicsByAlphabet.letter}</h4>
      <div className="grid grid-cols-2 gap-2.5">
        {topicsByAlphabet.titles.map((topics) => (
          <SingleTranscriptContent {...topics} />
        ))}
      </div>
    </div>
  )
}

export default GroupedTranscriptContent