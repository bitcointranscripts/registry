import React from "react";
import { Ubuntu } from "next/font/google";
import { BitcoinIcon } from "bdp-ui/icons";

export const ubuntu = Ubuntu({ subsets: ["latin"], display: "swap", weight: ["700"], style: ["italic"] });

interface LogoInterface {
  iconStyles: string;
  textStyles: string;
}

const Logo = ({ iconStyles, textStyles }: LogoInterface) => {
  return (
    <div className='flex items-center gap-1 w-fit flex-nowrap'>
      <BitcoinIcon className={`text-orange-custom-100 ${iconStyles}`} />
      <h4 className={`italic font-bold ${ubuntu.className} ${textStyles}`}>Transcripts</h4>
    </div>
  );
};

export default Logo;
