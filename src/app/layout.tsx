import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@bitcoin-dev-project/bdp-ui/styles.css";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/layout/Header";
import QueryProvider from "./providers";
import { ThemeProvider } from "next-themes";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Bitcoin Transcripts",
  description: "A collection of technical bitcoin and lightning transcripts",
  icons: {
    icon: "/btctranscripts.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <QueryProvider>
          <ThemeProvider
        attribute={"class"}
        >
        <Header />
            {children}
        </ThemeProvider>
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
