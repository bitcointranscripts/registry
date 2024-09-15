import { getDoubleDigits, TopicsData } from "@/utils";
import Link from "next/link";
import React from "react";

const SingleTranscriptContent = ({ title, count }: TopicsData) => {
  return (
    <Link
      href={"/"}
      className="flex capitalize border max-w-[100%]  border-gray-custom-1200 rounded-[5px] justify-between items-center text-sm py-5 px-4 lg:py-7 lg:px-6 lg:text-lg font-semibold text-gray-custom-1100"
    >
      <span className="text-wrap break-words max-w-[80%]">{title}</span>
      <span className="font-normal font-basis-mono">{getDoubleDigits(count)}</span>
    </Link>
  );
};

export default SingleTranscriptContent;
