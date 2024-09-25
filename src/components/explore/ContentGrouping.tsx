import { createSlug, GroupedData } from "@/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";

export interface IContentGrouping {
  currentGroup: string;
  groupedData: GroupedData | never[];
  screen?: "mobile" | "desktop";
}
const ContentGrouping = ({
  currentGroup,
  groupedData,
  screen,
}: IContentGrouping) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const onOptionsChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    if (linkRef.current) {
      linkRef.current.href = `#${value}`;
      linkRef.current.click();
    }
  };

  useEffect(() => {
    if (currentGroup) {
      if (selectRef.current) {
        selectRef.current.value = createSlug(currentGroup);
      }
    }
  }, [currentGroup]);

  return (
    <>
      {screen === "desktop" && (
        <div
          className={
            " flex-col p-5 hidden lg:flex gap-2.5 border max-h-[calc(95vh-var(--header-height))] overflow-scroll border-gray-custom-1200 rounded-md  "
          }
        >
          {Object.keys(groupedData).map((char) => (
            <Link
              key={char}
              href={`#${createSlug(char)}`}
              className={` flex    text-base  2xl:text-lg   ${
                createSlug(currentGroup) == createSlug(char)
                  ? "text-orange-custom-100 rounded-[4px]"
                  : ""
              } `}
            >
              {char}
            </Link>
          ))}
        </div>
      )}
      {screen === "mobile" && (
        <>
          <a href={"#a"} ref={linkRef} className="hidden">
            {" "}
            link group
          </a>
          <div
            className=" pr-2 bg-orange-custom-800 py-2.5 px-4 rounded-md mx-1"
          >
            <select
              onChange={onOptionsChange}
              value={currentGroup}
              ref={selectRef}
              className="pr-3  bg-orange-custom-800   w-full outline-none"
            >
              {Object.keys(groupedData).map((char) => (
                <option key={char} value={createSlug(char)}>
                  {char}{" "}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};

export default ContentGrouping;
