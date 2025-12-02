"use client";

import { Banner } from "@bitcoin-dev-project/bdp-ui";
import { usePathname } from "next/navigation";


const BossBanner = () => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  return (
    <div className={`w-full bg-bdp-background sticky top-[var(--header-height)] z-[15] ${!isHome ? "hidden" : ""}`}>
      <Banner
        headingText="Start your career in bitcoin open source —"
        linkText="APPLY TO THE ₿OSS CHALLENGE TODAY"
        linkTo="https://bosschallenge.xyz"
        hasBoss
      />
    </div>
  );
};

export default BossBanner;