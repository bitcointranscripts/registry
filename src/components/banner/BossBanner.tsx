"use client"
import { Banner } from "@bitcoin-dev-project/bdp-ui";

const BossBanner = () => {
  return (
    <div className={`w-full bg-bdp-background sticky top-[var(--header-height)] z-50`}>
      <Banner
        headingText="Start your career in bitcoin open source —"
        linkText="APPLY TODAY"
        linkTo="https://learning.chaincode.com/#BOSS"
        hasBoss
      />
    </div>
  );
};

export default BossBanner;
