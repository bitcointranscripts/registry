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

  const isEnglishSlug = language === "en";
  const allRoutes = pathnameArray.map((path, idx) => {
    const route = pathname
      .split("/")
      // we use the isEnglishSlug to determine the number of slugs to be sliced to appropriately create the path route.
      .slice(0, idx + (isEnglishSlug ? 1 : 2))
      .join("/");

    return { name: path || "home", link: idx === 0 ? "/" : route || "/" };
  });

  if (!isNotSourcesPage && pathnameArray[1] !== "sources") {
    allRoutes.splice(1, 0, { name: "Sources", link: `${isEnglishSlug ? "/sources" : `/${language}/sources`}` });
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
              isActive.name.toLowerCase() === link.name.toLowerCase() ? "text-orange-custom-100" : "text-black md:text-gray-custom-800 dark:text-gray-custom-600"
            }`}
            href={link.link}
          >
            {link.name}
          </Link>
          {i !== allRoutes.length - 1 && <p className='text-custom-black-custom-200 dark:text-gray-custom-600'>/</p>}
        </div>
      ))}
    </div>
  );
};
