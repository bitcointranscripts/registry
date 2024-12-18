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
