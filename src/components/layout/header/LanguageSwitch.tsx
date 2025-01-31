import { LanguageCode, LanguageCodes, LanguageConfig } from "@/config";
import { LanguageSwitchConfig } from "@/types";
import { generateNewUrlForLanguage } from "@/utils/locale";
import { ArrowRight } from "@bitcoin-dev-project/bdp-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const defaultLanguageConfig: LanguageSwitchConfig = {
  currentLanguage: "en",
  pageAvailableLanguages: [],
  websiteLanguages: [],
};

const LanguageSwitch = ({ callback }: { callback?: () => void }) => {
  const path = usePathname();

  const [languageConfig, setLanguageConfig] = useState<LanguageSwitchConfig>(
    defaultLanguageConfig
  );
  const [isOpen, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen(!isOpen);

  useEffect(() => {
    const handleFocusOut = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleFocusOut);
    };
  }, [isOpen]);

  useEffect(() => {
    const getLanguageConfig = () => {
      const pageAvailableLanguages: LanguageSwitchConfig["pageAvailableLanguages"] =
        [];

      let currentLanguage = LanguageCodes.find(
        (lan) => lan === path.split("/")[1]
      )?.toLowerCase() as LanguageCode;
      if (!currentLanguage) {
        currentLanguage =
          document.head
            .querySelector('meta[name="language"]')
            ?.getAttribute("content") as LanguageCode ?? LanguageCode.en as LanguageCode;
      }

      document.head
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((element) => {
          pageAvailableLanguages.push({
            language: element.getAttribute("hreflang") as LanguageCode,
            url: element.getAttribute("href") ?? "",
          });
        });


      // create a set of all the language field in the pageAvailableLanguages array and the current language
      const alreadyAdded = new Set(pageAvailableLanguages.map(({ language }) => language).concat(currentLanguage));

      // website languages should not include languages alrady in the pageAvailableLanguages array
      const websiteLanguages = Object.entries(LanguageConfig)
        .filter(([key, _value]) => !alreadyAdded.has(key as LanguageCode))
        .map(([key, value]) => ({
          language: key,
          url: value.url,
        })) as LanguageSwitchConfig["websiteLanguages"];

      return {
        currentLanguage: currentLanguage as LanguageCode,
        pageAvailableLanguages,
        websiteLanguages,
      };
    };
    const languageConfig = getLanguageConfig();
    if (languageConfig.currentLanguage) {
      setLanguageConfig(languageConfig);
    } else {
      setLanguageConfig(defaultLanguageConfig);
    }
  }, [path]);

  const isDisabled =
    !languageConfig.pageAvailableLanguages.length &&
    !languageConfig.websiteLanguages.length;

  const handleSwitch = () => {
    setOpen(false);
    callback && callback();
  };

  return (
    <div id="language-switch" ref={wrapperRef} className="relative">
      <section className="group/menuBtn">
        <button
          disabled={isDisabled}
          className="bg-gray-custom-100 border border-gray-custom-400 w-[189px] md:w-[108px] h-[45px] md:h-12 px-[17px] py-[11px] text-black rounded-lg cursor-pointer before:absolute capitalize flex items-center justify-between disabled:cursor-not-allowed"
          onClick={toggle}
        >
          <p className="cursor-pointer text-black uppercase pointer-events-none">
            {languageConfig.currentLanguage}
          </p>
          <span
            className={twMerge(
              "group-aria-[expanded=false]/menuBtn:rotate-180 transition-transform",
              isOpen ? "rotate-180 transition-transform" : "",
              isDisabled ? "opacity-30 cursor-not-allowed" : ""
            )}
          >
            <ArrowRight className="rotate-90 w-[28px] h-[14px] text-gray-custom-200 max-xl:w-5" />
          </span>
        </button>
      </section>

      <div
        className={twMerge(
          "min-w-[200px] focus-visible:shadow-none focus-visible:outline-none mt-2 absolute z-50 left-1 md:right-0 bg-white shadow-all-round",
          "rounded p-2 md:p-4 flex flex-col gap-1 md:gap-2 items-center",
          isOpen ? "block" : "hidden"
        )}
      >
        {languageConfig.pageAvailableLanguages.length > 0 && (
          <SelectorGroup title="Page available in" data={languageConfig.pageAvailableLanguages} callback={handleSwitch} getLink={(language) => generateNewUrlForLanguage(path, language)} />
        )}
        {/* divider */}

        {languageConfig.websiteLanguages.length > 0 && (
          <>
            <div className="h-[1px] w-full bg-gray-custom-400 my-3" />
            <SelectorGroup title="Website also available in" data={languageConfig.websiteLanguages} callback={handleSwitch} />
          </>
        )}
      </div>
    </div>
  );
};

const SelectorGroup = ({ title, callback, data, getLink  }: { title: string, callback?: () => void, data: LanguageSwitchConfig["pageAvailableLanguages"], getLink?: (language: string) => string }) => {
  return (
    <div className="flex flex-col gap-1 justify-center">
      <p className="font-semibold text-gray-custom-400">{title}</p>
      {data.map(({ language, url }) => (
        <Link
          key={language}
          href={getLink ? getLink(language) : url}
          onClick={callback && callback}
          className="py-1 flex items-center gap-2 text-sm md:text-base leading-[17.6px] font-medium hover:text-custom-accent rounded-md"
        >
          <span>{LanguageConfig[language].name}</span>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitch;
