import Link from "next/link";
import React from "react";

interface IBreadCrumbs {
  links: linkObject[];
  rootLink: string;
}
type linkObject = {
  link: string;
  name: string;
};
const BreadCrumbs = ({ links, rootLink }: IBreadCrumbs) => {
  const isLinksArray = Array.isArray(links);
  return (
    <div className="flex gap-1">
      {isLinksArray &&
        links.map((link, i) => (
          <div className="flex gap-1 items-center">
            <Link className="capitalize hover:underline font-medium text-base text-gray-custom-800" href={link.link}>
              {link.name}
            </Link>
           { i !== links.length-1 && <p className="text-custom-black-custom-200">/</p>}
          </div>
        ))}
    </div>
  );
};

export default BreadCrumbs;
