import { StaticImageData } from "next/image";
import chatbtc from "/public/images/chat-btc.jpg";
import bitcoinSearch from "/public/images/bitcoin-search.jpg";
import bitcointldr from "/public/images/bitcoin-tldr.jpg";
import savingSatoshi from "/public/images/saving-satoshi.jpg";
import transcriptsreview from "/public/images/bitcoin-transcripts-review.jpg";

export type MenuApp = {
  href: string;
  image: string | StaticImageData;
  alt: string;
};

export const menuApps = [
  {
    href: "https://chat.bitcoinsearch.xyz",
    image: chatbtc,
    alt: "ChatBTC image",
  },
  {
    href: "https://bitcoinsearch.xyz/",
    image: bitcoinSearch,
    alt: "Bitcoin search",
  },
  {
    href: "https://tldr.bitcoinsearch.xyz/",
    image: bitcointldr,
    alt: "Bitcoin TLDR",
  },
  {
    href: "https://savingsatoshi.com",
    image: savingSatoshi,
    alt: "Saving Satoshi",
  },
  {
    href: "https://review.btctranscripts.com/",
    image: transcriptsreview,
    alt: "Bitcoin Transcripts Review",
  },
] satisfies Array<MenuApp>;
