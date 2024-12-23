import { StaticImageData } from "next/image";
import { IsoDateTimeString } from "contentlayer2/core";
import { ContentData } from ".";

export type MenuApp = {
  href: string;
  image: string | StaticImageData;
  alt: string;
  title: string;
};

export const menuApps = [
  {
    href: "https://bitcoindevs.xyz/",
    image: "/images/bitcoin-devs.jpg",
    alt: "Bitcoin Devs",
    title: "Study & contribute to bitcoin and lightning open source",
  },
  {
    href: "https://chat.bitcoinsearch.xyz",
    image: "/images/chat-btc.jpg",
    alt: "ChatBTC image",
    title: "Interactive AI chat to learn about bitcoin technology and its history",
  },
  {
    href: "https://bitcoinsearch.xyz/",
    image: "/images/bitcoin-search.jpg",
    alt: "Bitcoin search",
    title: "Technical bitcoin search engine",
  },
  {
    href: "https://tldr.bitcoinsearch.xyz/",
    image: "/images/bitcoin-tldr.jpg",
    alt: "Bitcoin TLDR",
    title: "Daily summary of key bitcoin tech development discussions and updates",
  },
  {
    href: "https://savingsatoshi.com",
    image: "/images/saving-satoshi.jpg",
    alt: "Saving Satoshi",
    title: "Engaging bitcoin dev intro for coders using technical texts and code challenges",
  },
  {
    href: "https://review.btctranscripts.com/",
    image: "/images/bitcoin-transcripts-review.jpg",
    alt: "Bitcoin Transcripts Review",
    title: "Review technical bitcoin transcripts and earn sats",
  },
] satisfies Array<MenuApp>;

export const ExploreNavigationItems = [
  {
    href: "/categories",
    title: "Categories",
  },
  {
    href: "/topics",
    title: "Topics",
  },
  {
    href: "/speakers",
    title: "Speakers",
  },
  {
    href: "/types",
    title: "Types",
  },
  {
    href: "/sources",
    title: "Sources",
  },
];

export const alphabeticalArrangement = [
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export type ContentTreeArray = {
  title: string;
  speakers?: string[] | undefined;
  date?: IsoDateTimeString | undefined;
  tags?: string[] | undefined;
  tagsDetailed?: ContentData[];
  languageURL?: string;
  sourceFilePath: string;
  flattenedPath: string;
  summary?: string | undefined;
  body: string;
};

export const processFlowData = [
  {
    title: "Curator Adds Sources",
    content: "Curator adds sources and resources to the Transcription Backlog.",
    image: "/svgs/sources-icon.svg",
    bgColor: "#FCEDF3",
  },
  {
    title: "AI Transcription",
    content: "Resources from the backlog are sent to the AI Transcription Service for processing.",
    image: "/svgs/ai-icon.svg",
    bgColor: "#F0F1FA",
  },
  {
    title: "Initial Publication",
    content: "AI-generated transcripts are published on the Registry and also added to the Review Queue.",
    image: "/svgs/initial-publication-icon.svg",
    bgColor: "#FFF5EB",
  },
  {
    title: "Human Review",
    content: "Reviewers claim and edit transcripts from the Review Queue and submit them for approval.",
    image: "/svgs/review-icon.svg",
    bgColor: "#ECF9F1",
  },
  {
    title: "Evaluation",
    content: "Editors review and approve finalized transcripts.",
    image: "/svgs/evaluation-icon.svg",
    bgColor: "#FCEDED",
  },
  {
    title: "Final Publication",
    content: "Approved transcripts are updated on the Registry as final versions, and Reviewers receive a payout for their work",
    image: "/svgs/final-publication-icon.svg",
    bgColor: "#FCEDF3",
  },
] satisfies Array<{ [key: string]: string }>;
