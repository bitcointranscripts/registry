"use client"

import React from 'react'
import TranscriptBioData from '../components/transcripts/TranscriptBioData'

const TestComponent = () => {
  return (
    <div className='flex p-4 flex-col'>
            <TranscriptBioData
                    title="Newsletter #292 Recap"
                    date={"7 March, 2004"}
                    topics={["Anonymity Networks", "Research"]}
                    speakers={["Gloria Zhao", "Tuedon Tuoyo"]}
                    transcriptBy={"Afolabi"}
            />
    </div>
  )
}

export default TestComponent