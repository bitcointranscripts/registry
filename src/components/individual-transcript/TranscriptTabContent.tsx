import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./markdown.css";


function formatSpeakerText(text: string): string {
  // Regular expression pattern for "Speaker: HH:MM:SS"
  const pattern = /(\b\w+(?: \w+)*): (\d{2}:\d{2}:\d{2})/g;

  return text.replace(pattern, (match, speaker, time) => {
    const formattedSpeaker = `<span className="font-mono font-bold text-black text-base leading-[1.36rem]">${speaker}:</span>`;
    const formattedTime = `<span className="text-gray-custom-1700 font-mono text-base leading-[1.36rem]">${time}</span>`;

    return `<p className="inline-block mt-2" > ${formattedSpeaker} ${formattedTime} </p>`;
  });
}

const TranscriptTabContent = ({ markdown }: { markdown: string }) => {
  const formattedMarkdown = formatSpeakerText(markdown);
  return (
    <MarkdownPreview
      source={formattedMarkdown}
      className={`!bg-transparent`}
    />
  );
};

export default TranscriptTabContent;
