import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@bitcoin-dev-project/bdp-ui/styles.css";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/header/Header";
import QueryProvider from "./providers";
import { LanguageCode } from "@/config";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bitcoin Transcripts",
  description: "A collection of technical bitcoin and lightning transcripts",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
  languageCode = LanguageCode.en,
}: Readonly<{
  children: React.ReactNode;
  languageCode?: LanguageCode;
}>) {
  return (
    <html lang={languageCode}>
      <body className={manrope.className}>
        <QueryProvider>
          <Header />
            {children}
        </QueryProvider>
      </body>
      <Script
        async
        src="https://visits.bitcoindevs.xyz/script.js"
        data-website-id="06384ada-7f1c-44c2-a6d9-d830fb23e122"
      ></Script>
    </html>
  );
}
