import React from 'react'
import SingleTranscriptContent from './SingleTranscriptContent'

const GroupedTranscriptContent = () => {
  return (
    <div className='flex flex-col gap-7'>
        <h4 className='font-bold text-2xl'>A</h4>
        <div className='grid grid-cols-2 gap-2.5'>
                <SingleTranscriptContent />
                <SingleTranscriptContent />
        </div>
    </div>
  )
}

export default GroupedTranscriptContent