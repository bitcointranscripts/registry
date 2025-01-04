"use client";

import React, { FC, useState } from "react";
import GroupedTranscriptContent from "./GroupedTranscriptContent";
import AlphabetNavigation from "./AlphabetNavigation";
import {
    ExploreGroupedData,
  groupDataByAlphabet,
  sortKeysAlphabetically,
} from "@/utils";
import MobileAlphabetNavigation from "./MobileAlphabetNavigation";
import NavigationByWords from "./NavigationByWords";
import BaseCrumbLists from "../common/BaseCrumbLists";
import { usePathname } from "next/navigation";
import { LanguageCodes } from "@/config";

interface ITranscriptContentPage {
  header: string;
  description?: string;
  mobileDescription?: string;
  data: ExploreGroupedData[];
  type: "alphabet" | "words";
  linkName: string;
}

const TranscriptContentPage: FC<ITranscriptContentPage> = ({
  header,
  data,
  description,
  mobileDescription,
  linkName,
  type,
}) => {

  const groupedData =
    type === "alphabet"
      ? groupDataByAlphabet(data)
      : sortKeysAlphabetically(data);
  const [currentGroup, setCurrentGroup] = useState<string>(groupedData[0].slug);

  const pathname = usePathname();
  const pathnameArray = pathname.split("/");

  const routes = pathnameArray.map((path, idx) => {
    const route = pathname
      .split("/")
      .slice(0, idx + 1)
      .join("/");

    return {
      name: path || "home",
      link: route || "/",
      isActive: idx === pathnameArray.length - 1,
    };
  });

  // remove language codes from paths passed to breadcrumbs
  const allRoutes = routes.filter(
    (route) => !LanguageCodes.includes(route.name),
  );

  return (
    <div className="flex items-start relative lg:gap-[50px]">
      <div className="flex flex-col w-full gap-6 lg:gap-10 no-scrollbar">
        <div className="block lg:hidden sticky top-0">
          {type == "alphabet" && (
            <MobileAlphabetNavigation
              currentGroup={currentGroup}
              groupedData={groupedData}
            />
          )}
          {type == "words" && (
            <NavigationByWords
              navigationList={groupedData}
              currentGroup={currentGroup}
              screen="mobile"
            />
          )}
        </div>
        <div className="flex flex-col border-b border-b-gray-custom-1900  dark:border-b-gray-custom-1800 pb-6 lg:pb-10  gap-6 ">
          <BaseCrumbLists crumbsArray={allRoutes} />
          <div className="flex flex-col gap-1  lg:gap-4">
            <h3 className="text-xl  2xl:text-2xl font-medium dark:text-gray-custom-100">{header}</h3>
            <p className="hidden lg:inline-block text-sm  lg:text-base 2xl:text-lg text-custom-black-custom-300 dark:text-gray-custom-100">
              {description}
            </p>
            <p className="inline-block lg:hidden text-sm lg:text-lg text-custom-black-custom-300">
              {mobileDescription || description}
            </p>
          </div>
        </div>

        <div className="flex-col flex gap-10  pb-10">
          {
            groupedData.map((alp) => (
              <GroupedTranscriptContent
                setCurrentGroup={setCurrentGroup}
                key={alp.slug}
                dataByHeading={alp} // The Heading above all GroupedData
                linkName={linkName}
                type={type}
              />
            ))}
        </div>
      </div>

      <div className="hidden lg:flex sticky top-0 self-start flex-shrink-0 w-fit lg:justify-center ">
        {type === "alphabet" && (
          <AlphabetNavigation
            groupedData={groupedData}
            currentGroup={currentGroup}
          />
        )}
        {type == "words" && (
          <NavigationByWords
            navigationList={groupedData}
            currentGroup={currentGroup}
            screen="desktop"
          />
        )}
      </div>
    </div>
  );
};

export default TranscriptContentPage;
