import Link from "next/link";
import { FC } from "react";

export type BaseBreadCrumbsType = {
  name: string;
  link: string;
  isActive: boolean;
};

const BaseBreadCrumbs = ({crumbsArray}:{crumbsArray:BaseBreadCrumbsType[]}) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {crumbsArray.map((link, i) => (
        <div key={link.name} className="flex gap-1 items-center">
          <Link
            className={`capitalize hover:underline font-medium text-sm 2xl:text-base text-nowrap ${
              link.isActive
                ? "text-orange-custom-100"
                : "text-black md:text-gray-custom-800"
            }`}
            href={link.link}
          >
            {link.name}
          </Link>
          {i !== crumbsArray.length - 1 && (
            <p className="text-custom-black-custom-200">/</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BaseBreadCrumbs;
