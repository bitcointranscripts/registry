import React from "react";
import { MicIcon } from "bdp-ui/icons";

interface TranscriptCardProps {
  title: string;
  transcribed?: string;
  transcripts?: number;
  speakers?: string[];
}

const TranscriptCard = ({ title, transcribed, transcripts, speakers }: TranscriptCardProps) => {
  const remainingSpeakers = speakers?.length && speakers.length > 2 ? speakers.length - 2 : 0;

  return (
    <div
      className={`flex flex-col ${
        transcripts ? "min-w-[400px] max-md:min-w-[292px]" : "max-w-[580px] w-full"
      } p-6 gap-4 text-black border border-gray-custom-600 rounded-xl shadow-md cursor-pointer max-2xl:p-[18px] max-md:p-4`}
    >
      <section className='flex justify-between items-center gap-4'>
        <p className='text-xl font-medium max-xl:text-lg max-md:text-base'>{title}</p>
        <p className='text-sm text-nowrap whitespace-normal'>{transcribed}</p>
      </section>

      {transcripts ? (
        <p>{transcripts} Transcripts</p>
      ) : (
        <section className='flex gap-[9px] items-center max-md:gap-1'>
          <span>
            <MicIcon className='w-5' />
          </span>
          <div className='flex gap-[9px] flex-wrap'>
            {speakers?.length ? (
              <div className='flex flex-wrap gap-[9px] max-md:gap-2'>
                {speakers.slice(0, 2).map((speaker, idx) => (
                  <p
                    key={idx}
                    className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'
                  >
                    {speaker}
                  </p>
                ))}

                {remainingSpeakers === 0 ? null : (
                  <p className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 whitespace-nowrap text-nowrap max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'>
                    + {remainingSpeakers} more
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
};

export default TranscriptCard;
