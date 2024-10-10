import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const BreadCrumbs = () => {
  const pathname = usePathname()
  const allRoutes= pathname.split("/").map(path=> ({name:path || "home", link:`/${path||""}`}))

  return (
    <div className="flex gap-1">
      {
        allRoutes.map((link, i) => (
          <div key={link.name} className="flex gap-1 items-center">
            <Link
              className={
                ` text-gray-custom-800 capitalize hover:underline font-medium text-sm    2xl:text-base`
              }
              href={link.link}
            >
              {link.name}
            </Link>
            {i !== allRoutes.length - 1 && (
              <p className="text-custom-black-custom-200">/</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default BreadCrumbs;
