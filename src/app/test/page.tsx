"use client"

import TranscriptBioData from '@/app/components/transcript-single/TranscriptBioData'
import React from 'react'

const TestComponent = () => {
  return (
    <TranscriptBioData title='Newsletter #292 Recap' date={"7 March, 204"} topics={["Anonymity Networks","Research"]} speakers={["Gloria Zhao", "Tuedon Tuoyo"]} transcriptBy={"Afolabi"}/>
  )
}

export default TestComponent