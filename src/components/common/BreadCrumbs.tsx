import Link from "next/link";
import React from "react";

interface IBreadCrumbs {
  links: linkObject[];
}
type linkObject = {
  link: string;
  name: string;
};
const BreadCrumbs = ({ links }: IBreadCrumbs) => {
  const isLinksArray = Array.isArray(links);
  return (
    <div className="flex gap-1">
      {isLinksArray &&
        links.map((link, i) => (
          <div key={link.name} className="flex gap-1 items-center">
            <Link
              className={
                `${i !== links.length-1 ? "text-black" :"text-gray-custom-800"} capitalize hover:underline font-medium text-sm   xl:text-base`
              }
              href={link.link}
            >
              {link.name}
            </Link>
            {i !== links.length - 1 && (
              <p className="text-custom-black-custom-200">/</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default BreadCrumbs;
