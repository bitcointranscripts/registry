import Link from "next/link";
import React from "react";

const SingleTranscriptContent = () => {
  return (
    <Link
      href={"/"}
      className="flex border border-gray-custom-1200 rounded-[5px] justify-between items-center py-7 px-6 text-lg font-semibold text-gray-custom-1100"
    >
      <span>Accountable Computing Contracts</span>
      <span>01</span>
    </Link>
  );
};

export default SingleTranscriptContent;
