"use client";

import React, { useState } from "react";

const ContentSwitch = () => {
  const [openSection, setOpenSection] = useState({ transcript: true, summary: false, extraInfo: false });

  return (
    <div className='flex flex-col'>
      <div className='flex gap-4 md:gap-10 xl:gap-16 justify-between items-center border-b border-b-gray-custom-1200'>
        <SwitchItem
          title='Transcript'
          isOpen={openSection.transcript}
          onClick={() => setOpenSection((prev) => ({ ...prev, transcript: true, summary: false, extraInfo: false }))}
        />
        <SwitchItem
          title='Summary'
          isOpen={openSection.summary}
          onClick={() => setOpenSection((prev) => ({ ...prev, summary: true, transcript: false, extraInfo: false }))}
        />
        <SwitchItem
          title='Extra Info'
          isOpen={openSection.extraInfo}
          onClick={() => setOpenSection((prev) => ({ ...prev, extraInfo: true, transcript: false, summary: false }))}
        />
      </div>

      <div className='pt-4'>
        {openSection.transcript ? <section>transcript</section> : null}
        {openSection.summary ? <section>summary</section> : null}
        {openSection.extraInfo ? <section>extra info</section> : null}
      </div>
    </div>
  );
};

const SwitchItem = ({ title, isOpen, onClick }: { title: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick} className='w-full flex items-start justify-center h-[31px] md:h-12 xl:h-14 2xl:h-[60px]'>
      <section className='flex flex-col h-full items-center justify-between relative w-full'>
        <p className='text-sm md:text-base xl:text-lg 2xl:text-xl font-bold text-orange-custom-100'>{title}</p>
        {isOpen ? <div className='h-1 bg-orange-custom-100 w-full absolute bottom-0'></div> : null}
      </section>
    </button>
  );
};

export default ContentSwitch;
