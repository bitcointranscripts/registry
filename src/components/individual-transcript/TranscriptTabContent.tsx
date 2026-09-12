import React, { SetStateAction } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "./markdown.css";
import { InView } from "react-intersection-observer";
import { createContentSlug } from "@/utils";
import Link from "next/link";

const isExternalUrl = (src?: string) =>
  !!src && (src.startsWith("http://") || src.startsWith("https://"));

const resolveRelativeAssetPath = (src: string, currentSlug: string) => {
  const normalizedSrc = src.replace(/^\.\//, "");
  if ((normalizedSrc.split("/").length || 0) > 1) return `/transcript-images${normalizedSrc}`;
  return `/transcript-images/${currentSlug}/${normalizedSrc}`;
};

const isPdfHref = (href?: string) =>
  !!href && href.toLowerCase().split(/[?#]/)[0].endsWith(".pdf");

function formatSpeakerText(text: string): string {
  // Match a full line containing a speaker name (which may have more than two
  // words, e.g. "Aaron van Wirdum") followed by an optional colon and a timestamp
  const pattern = /^(.+?):?\s+(\d{2}:\d{2}:\d{2})\s*$/gm;

  // Replace matched text with formatted HTML
  return text.replace(pattern, (_match, speaker, time) => {
    // HTML for the speaker's name
    const formattedSpeaker = `<span className="font-bold text-black text-base leading-[1.36rem]">${speaker}:</span>`;
    // HTML for the timestamp
    const formattedTime = `<span className="text-gray-custom-1700 font-bold text-base leading-[1.36rem]">${time}</span>`;

    // Return the combined formatted HTML within a paragraph tag, followed by a
    // blank line so this HTML block doesn't swallow the following paragraph
    // when the source markdown has no blank line after the speaker line
    return `<p className="inline-block mt-2">${formattedSpeaker} ${formattedTime}</p>\n`;
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
                    const href = props.href || "";
          const resolvedHref =
            isPdfHref(href) && !isExternalUrl(href)
              ? resolveRelativeAssetPath(href, currentSlug)
              : href;
          return (
            <Link
              target="_blank"
              className="text-orange-custom-100"
              href={resolvedHref}
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
          if (isExternalUrl(props.src)) {
            const { src, ...rest } = props;
            return <img src={src} className={className} {...rest} />;
          }
          return <img src={resolveRelativeAssetPath(props.src || "", currentSlug)} />;
        },
      }}
    />
  );
};

export default TranscriptTabContent;
