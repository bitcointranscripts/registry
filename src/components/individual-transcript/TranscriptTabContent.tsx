import React, { SetStateAction } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./markdown.css";
import { InView } from "react-intersection-observer";
import { createContentSlug } from "@/utils";

function formatSpeakerText(text: string): string {
  // Regular expression pattern for "Speaker: HH:MM:SS"
  const pattern = /(\b\w+(?: \w+)*):? (\d{2}:\d{2}:\d{2})/g;

  return text.replace(pattern, (match, speaker, time) => {
    const formattedSpeaker = `<span className=" font-bold text-black text-base leading-[1.36rem]">${speaker}:</span>`;
    const formattedTime = `<span className="text-gray-custom-1700 font-bold  text-base leading-[1.36rem]">${time}</span>`;

    return `<p className="inline-block mt-2" > ${formattedSpeaker} ${formattedTime} </p>`;
  });
}

const TranscriptTabContent = ({
  markdown,
  setCurrentHeading,
}: {
  markdown: string;
  setCurrentHeading?: React.Dispatch<SetStateAction<string>>;
}) => {
  const formattedMarkdown = formatSpeakerText(markdown);

  return (
    <MarkdownPreview
      source={formattedMarkdown}
      className={`!bg-transparent`}
      components={{
        h1: ({ children = [], className, ...props }) => {
          return (
            <InView
              as="div"
              rootMargin="-30% 0% -70% 0%"
              onChange={(inView, entry) => {
                console.log(props.id, "test")
                if (setCurrentHeading && inView) {
                  setCurrentHeading(createContentSlug(props?.id || ""));
                }
              }}
            >
              <h1 id={createContentSlug(props?.id || "")}>{children}</h1>
            </InView>
          );
        },
        h2: ({ children = [], className, ...props }) => {
          return (
            <InView
              as="div"
              rootMargin="-30% 0% -70% 0%"
              onChange={(inView, entry) => {
                if (setCurrentHeading && inView) {
                  console.log(props.id, "test")
                  setCurrentHeading(createContentSlug(props?.id || ""));
                }
              }}
            >
              <h2 id={createContentSlug(props?.id || "")}>{children}</h2>
            </InView>
          );
        },
        h3: ({ children = [], ...props }) => {
          return (
            <InView
              as="div"
              rootMargin="-30% 0% -70% 0%"
              onChange={(inView) => {
                if (setCurrentHeading && inView) {
                  console.log(props.id, "test")
                  setCurrentHeading(createContentSlug(props?.id || ""));
                }
              }}
            >
              <h3 id={createContentSlug(props?.id || "")}>{children}</h3>
            </InView>
          );
        },
      }}
    />
  );
};

export default TranscriptTabContent;
