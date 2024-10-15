import { StaticImageData } from "next/image";
import { IsoDateTimeString } from "contentlayer2/core";

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
    bgColor: "bg-pink-custom-100",
  },
  {
    title: "AI Transcription",
    content: "Resources from the backlog are sent to the AI Transcription Service for processing.",
    image: "/svgs/ai-icon.svg",
    bgColor: "bg-blue-custom-200",
  },
  {
    title: "Initial Publication",
    content: "AI-generated transcripts are published on the Registry and also added to the Review Queue.",
    image: "/svgs/initial-publication-icon.svg",
    bgColor: "bg-orange-custom-200",
  },
  {
    title: "Human Review",
    content: "Reviewers claim and edit transcripts from the Review Queue and submit them for approval.",
    image: "/svgs/review-icon.svg",
    bgColor: "bg-green-custom-100",
  },
  {
    title: "Evaluation",
    content: "Editors review and approve finalized transcripts.",
    image: "/svgs/evaluation-icon.svg",
    bgColor: "bg-orange-custom-1000",
  },
  {
    title: "Final Publication",
    content: "Editors review and approve finalized transcripts.",
    image: "/svgs/final-publication-icon.svg",
    bgColor: "bg-pink-custom-100",
  },
] satisfies Array<{ [key: string]: string }>;

export const editors = [
  {
    title: "Lincoln Kenter",
    image: "",
  },
  {
    title: "Lydia Donin",
    image: "",
  },
];

export const reviewers = [
  {
    title: "Lydia Korsgaard",
    image: "",
  },
  {
    title: "Craig Dokidis",
    image: "",
  },
  {
    title: "Lincoln Curtis",
    image: "",
  },
  {
    title: "Randy Baptista",
    image: "",
  },
  {
    title: "Aspen Vaccaro",
    image: "",
  },
  {
    title: "Aspen Siphron",
    image: "",
  },
  {
    title: "Wilson Stanton",
    image: "",
  },
  {
    title: "Mira Ekstrom Bothman",
    image: "",
  },
  {
    title: "Chance Bergson",
    image: "",
  },
  {
    title: "Terry Vetrovs",
    image: "",
  },
  {
    title: "Maria Ekstrom Bothman",
    image: "",
  },
  {
    title: "Chance Westervelt",
    image: "",
  },
  {
    title: "Angel Kenter",
    image: "",
  },
];

export const curators = [
  {
    title: "Lydia Korsgaard",
    image: "",
  },
  {
    title: "Craig Dokidis",
    image: "",
  },
  {
    title: "Lincoln Curtis",
    image: "",
  },
  {
    title: "Randy Baptista",
    image: "",
  },
  {
    title: "Aspen Vaccaro",
    image: "",
  },
  {
    title: "Aspen Siphron",
    image: "",
  },
  {
    title: "Wilson Stanton",
    image: "",
  },
  {
    title: "Mira Ekstrom Bothman",
    image: "",
  },
  {
    title: "Chance Bergson",
    image: "",
  },
];
