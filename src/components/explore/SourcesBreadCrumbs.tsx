"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExploreNavigationItems } from "@/utils/data";

export const SourcesBreadCrumbs = ({ slugPaths, current }: { slugPaths: string[]; current: any }) => {
  const pathname = usePathname();

  const navListWithoutSources = ExploreNavigationItems.filter((item) => item.href !== "/sources").map((item) => item.href.slice(1));

  const language = slugPaths[1];
  const pathnameArray = pathname.replace(`/${language}`, "").split("/");
  const isNotSourcesPage = navListWithoutSources.includes(pathnameArray[1]);

  const allRoutes = pathnameArray.map((path, idx) => {
    const route = pathname
      .split("/")
      .slice(0, idx + 1)
      .join("/");
    return { name: path || "home", link: route || "/" };
  });

  if (!isNotSourcesPage && pathnameArray[1] !== "sources") {
    allRoutes.splice(1, 0, { name: "Sources", link: "/sources" });
  }

  const breadCrumbData = () => {
    const _trimPaths = pathnameArray.shift();
    let currentPathArray = pathnameArray;

    const extractedRoutes: Array<{ [key: string]: string }> = [];
    const language = slugPaths[1];

    for (let i = 0; i < pathnameArray.length; i++) {
      const pathChoice = i === 0 ? [slugPaths[0], language] : slugPaths;

      for (const part of pathChoice) {
        if (typeof current === "object" && !Array.isArray(current) && part in current) {
          current = current[part];
        }
      }

      extractedRoutes.push({ name: current?.metadata?.title as string, link: currentPathArray[i] });
    }

    return { extractedRoutes };
  };

  const { extractedRoutes } = breadCrumbData();
  let newRoutes: Array<{ [key: string]: string }> = [];

  if (extractedRoutes.length > 0) {
    newRoutes = allRoutes.map((route: any) => {
      const isPresent = extractedRoutes.find((extractedRoute) => extractedRoute.link === route.name);

      if (isPresent) {
        return { ...route, name: isPresent.name ?? route.name };
      }
      return route;
    });
  }

  const breadCrumbRoutes = extractedRoutes.length ? newRoutes : allRoutes;
  const isActive = breadCrumbRoutes[breadCrumbRoutes.length - 1];

  return (
    <div className='flex gap-1 flex-wrap'>
      {breadCrumbRoutes.map((link, i) => (
        <div key={link.name} className='flex gap-1 items-center'>
          <Link
            className={`capitalize hover:underline font-medium text-sm 2xl:text-base text-nowrap ${
              isActive.name.toLowerCase() === link.name.toLowerCase() ? "text-orange-custom-100" : "text-black md:text-gray-custom-800"
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
