import { StaticImageData } from "next/image";
import chatbtc from "/public/images/chat-btc.jpg";
import bitcoinSearch from "/public/images/bitcoin-search.jpg";
import bitcointldr from "/public/images/bitcoin-tldr.jpg";
import savingSatoshi from "/public/images/saving-satoshi.jpg";
import transcriptsreview from "/public/images/bitcoin-transcripts-review.jpg";
import bitcoindevs from "/public/images/bitcoin-devs.jpg";

export type MenuApp = {
  href: string;
  image: string | StaticImageData;
  alt: string;
  title: string;
};

export const menuApps = [
  {
    href: "https://bitcoindevs.xyz/",
    image: bitcoindevs,
    alt: "Bitcoin Devs",
    title: "Study & contribute to bitcoin and lightning open source",
  },
  {
    href: "https://chat.bitcoinsearch.xyz",
    image: chatbtc,
    alt: "ChatBTC image",
    title:
      "Interactive AI chat to learn about bitcoin technology and its history",
  },
  {
    href: "https://bitcoinsearch.xyz/",
    image: bitcoinSearch,
    alt: "Bitcoin search",
    title: "Technical bitcoin search engine",
  },
  {
    href: "https://tldr.bitcoinsearch.xyz/",
    image: bitcointldr,
    alt: "Bitcoin TLDR",
    title:
      "Daily summary of key bitcoin tech development discussions and updates",
  },
  {
    href: "https://savingsatoshi.com",
    image: savingSatoshi,
    alt: "Saving Satoshi",
    title:
      "Engaging bitcoin dev intro for coders using technical texts and code challenges",
  },
  {
    href: "https://review.btctranscripts.com/",
    image: transcriptsreview,
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
