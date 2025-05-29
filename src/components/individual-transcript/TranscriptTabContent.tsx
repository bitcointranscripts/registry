import React, { SetStateAction } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./markdown.css";
import { InView } from "react-intersection-observer";
import { createContentSlug } from "@/utils";
import Link from "next/link";

function formatSpeakerText(text: string): string {
  // Regular expression pattern to match "Speaker" or "Speaker:" followed by a timestamp
  const pattern = /(\b\w+(?: \w+)?\s*):? (\d{2}:\d{2}:\d{2})/g;

  // Replace matched text with formatted HTML
  return text.replace(pattern, (match, speaker, time) => {
    // HTML for the speaker's name
    const formattedSpeaker = `<span className="font-bold text-black text-base leading-[1.36rem]">${speaker}:</span>`;
    // HTML for the timestamp
    const formattedTime = `<span className="text-gray-custom-1700 font-bold text-base leading-[1.36rem]">${time}</span>`;

    // Return the combined formatted HTML within a paragraph tag
    return `<p className="inline-block mt-2">${formattedSpeaker} ${formattedTime}</p>`;
  });
}

const TranscriptTabContent = ({
  currentSlug,
  markdown,
  setCurrentHeading,
}: {
  currentSlug: string;
  markdown: string;
  setCurrentHeading?: React.Dispatch<SetStateAction<string>>;
}) => {
  const formattedMarkdown = formatSpeakerText(markdown);

  return (
    <MarkdownPreview
      source={formattedMarkdown}
      className={`!bg-transparent`}
      components={{
        a: ({ children = [], className, ...props }) => {
          return (
            <Link
              target="_blank"
              className="text-orange-custom-100"
              href={props.href || ""}
            >
              {children}
            </Link>
          );
        },
        h1: ({ children = [], className, ...props }) => {
          return (
            <InView
              as="div"
              threshold={1}
              rootMargin="35% 0% -65% 0%"
              onChange={(inView) => {
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
              threshold={1}
              rootMargin="35% 0% -65% 0%"
              onChange={(inView) => {
                if (setCurrentHeading && inView) {
                  setCurrentHeading(createContentSlug(props?.id || ""));
                }
              }}
            >
              <h2 id={createContentSlug(props?.id || "")}>{children}</h2>
            </InView>
          );
        },
        h3: ({ children = [], className, ...props }) => {
          return (
            <InView
              as="div"
              threshold={1}
              rootMargin="35% 0% -65% 0%"
              onChange={(inView) => {
                if (setCurrentHeading && inView) {
                  setCurrentHeading(createContentSlug(props?.id || ""));
                }
              }}
            >
              <h3 id={createContentSlug(props?.id || "")}>{children}</h3>
            </InView>
          );
        },
        img: ({ children = [], className, ...props }) => {
          // If we have an external link
          if (
            props.src?.startsWith("http://") ||
            props.src?.startsWith("https://")
          ) {
            const { src, ...rest } = props;
            return <img src={src} className={className} {...rest} />;
          } else if ((props.src?.split("/").length || 0) > 1) {
            return <img src={`/transcript-images${props.src}`} />;
          }
          return <img src={`/transcript-images/${currentSlug}/${props.src}`} />;
        },
      }}
    />
  );
};

export default TranscriptTabContent;
