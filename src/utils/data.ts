import { StaticImageData } from "next/image";
import { IsoDateTimeString } from "contentlayer2/core";
import { TagsDetailed } from ".";

export type MenuApp = {
  id: string;
  href: string;
  image: string | StaticImageData;
  alt: string;
};

export const menuApps = [
  {
    id: "bitcoin-devs",
    href: "https://bitcoindevs.xyz/",
    image: "/images/bitcoin-devs.jpg",
    alt: "Bitcoin Devs",
  },
  {
    id: "chat-btc",
    href: "https://chat.bitcoinsearch.xyz",
    image: "/images/chat-btc.jpg",
    alt: "ChatBTC image",
  },
  {
    id: "bitcoin-search",
    href: "https://bitcoinsearch.xyz/",
    image: "/images/bitcoin-search.jpg",
    alt: "Bitcoin search",
  },
  {
    id: "bitcoin-tldr",
    href: "https://tldr.bitcoinsearch.xyz/",
    image: "/images/bitcoin-tldr.jpg",
    alt: "Bitcoin TLDR",
  },
  {
    id: "saving-satoshi",
    href: "https://savingsatoshi.com",
    image: "/images/saving-satoshi.jpg",
    alt: "Saving Satoshi",
  },
  {
    id: "bitcoin-transcripts-review",
    href: "https://review.btctranscripts.com/",
    image: "/images/bitcoin-transcripts-review.jpg",
    alt: "Bitcoin Transcripts Review",
  },
] satisfies Array<MenuApp>;

export const ExploreNavigationItems = [
  {
    href: "/categories",
    title: "categories",
  },
  {
    href: "/topics",
    title: "topics",
  },
  {
    href: "/speakers",
    title: "speakers",
  },
  {
    href: "/types",
    title: "types",
  },
  {
    href: "/sources",
    title: "sources",
  },
];

export const previewImageDimensions = {
  width: 1280,
  height: 720,
};
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
  tagsDetailed?: TagsDetailed[];
  languageURL?: string;
  sourceFilePath: string;
  flattenedPath: string;
  summary?: string | undefined;
  body: string;
  language: string;
};

export const processFlowData = [
  {
    id: "curator",
    image: "/svgs/sources-icon.svg",
    bgColor: "#FCEDF3",
  },
  {
    id: "ai",
    image: "/svgs/ai-icon.svg",
    bgColor: "#F0F1FA",
  },
  {
    id: "initial-publication",
    image: "/svgs/initial-publication-icon.svg",
    bgColor: "#FFF5EB",
  },
  {
    id: "review",
    image: "/svgs/review-icon.svg",
    bgColor: "#ECF9F1",
  },
  {
    id: "evaluation",
    image: "/svgs/evaluation-icon.svg",
    bgColor: "#FCEDED",
  },
  {
    id: "final-publication",
    image: "/svgs/final-publication-icon.svg",
    bgColor: "#FCEDF3",
  },
] satisfies Array<{ [key: string]: string }>;
