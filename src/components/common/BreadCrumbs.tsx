"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadCrumbs = () => {
  const pathname = usePathname();

  const allRoutes = pathname.split("/").map((path, idx) => {
    const route = pathname
      .split("/")
      .slice(0, idx + 1)
      .join("/");

    return { name: path || "home", link: route };
  });

  const isActive = allRoutes[allRoutes.length - 1];

  return (
    <div className='flex gap-1 flex-wrap'>
      {allRoutes.map((link, i) => (
        <div key={link.name} className='flex gap-1 items-center'>
          <Link
            className={`capitalize hover:underline font-medium text-sm 2xl:text-base text-nowrap ${
              isActive.name.toLowerCase() === link.name.toLowerCase() ? "text-orange-custom-100 md:text-black" : "text-black md:text-gray-custom-800"
            }`}
            href={link.link}
          >
            {link.name}
          </Link>
          {i !== allRoutes.length - 1 && <p className='text-custom-black-custom-200'>/</p>}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
