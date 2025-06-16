"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookmarkIcon,
  CalendarIcon,
  MicIcon,
} from "@bitcoin-dev-project/bdp-ui/icons";
import { createSlug, FieldCountItem } from "@/utils";
import AiGeneratedIcon from "../svgs/AIGeneratedIcon";
import { format, isDate } from "date-fns";
import Pill from "./Pill";
import { getIsolatedFacetLink } from "@/service/URLManager/helper";
import useLang from "@/hooks/useLang";
import useTranslations from "@/hooks/useTranslations";
import YoutubeIcon from "../svgs/YoutubeIcon";
import PdfIcon from "../svgs/PdfIcon";
import Link from "next/link";

interface ITranscriptMetadataComponent {
  title: string;
  date: string | Date;
  topics: FieldCountItem[];
  speakers: string[] | null;
  transcriptBy: string | string[];
  source?: string;
  media?: string;
}

const TranscriptMetadataComponent = ({
  title,
  speakers,
  topics,
  date,
  transcriptBy,
  source,
  media,
}: ITranscriptMetadataComponent) => {
  const lang = useLang();
  const t = useTranslations(lang);

  const [showDetail, setShowDetail] = useState(true);
  const isAiGenerated = transcriptBy.includes("needs-review") ? true : false;
  const handleShowDetail = () => {
    setShowDetail((prev) => !prev);
  };

  const convertedDate = date ? new Date(date) : false;

  const formattedDate = isDate(convertedDate)
    ? format(convertedDate, "d MMMM, yyyy")
    : "";

  return (
    <div className="border flex text-black flex-col rounded-2xl p-4 md:p-5 2xl:p-6 gap-4 w-full border-gray-custom-1200">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <h4 className="text-black text-xl font-bold md:text-2xl 2xl:text-[2rem]">
          {title}
        </h4>

        <div className="flex gap-6">
          <div className="flex gap-4">
            {media && (
              <Link href={media || ""} target="_blank">
                <YoutubeIcon />
              </Link>
            )}

            {source && (
              <Link href={source || ""} target="_blank">
                <PdfIcon />
              </Link>
            )}
          </div>
          <button
            onClick={handleShowDetail}
            className="min-w-fit text-black text-sm lg:text-base gap-1 md:gap-2 py-1.5 2xl:py-2 px-3 flex items-center border rounded-lg border-gray-custom-1100 whitespace-nowrap"
          >
            {showDetail ? (
              <>
                <Image
                  src="/svgs/eye-close-icon.svg"
                  alt="eye close icon"
                  width={24}
                  height={24}
                  className="w-5"
                />
                <span>{t("transcript.hide-details")} </span>
              </>
            ) : (
              <>
                <Image
                  src="/svgs/eye-open-icon.svg"
                  alt="eye open icon"
                  width={24}
                  height={24}
                  className="w-5"
                />
                <span>{t("transcript.show-details")}</span>
              </>
            )}
          </button>
        </div>
      </div>
      {/* Depends on the Show and Hide Button */}
      {showDetail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 2xl:gap-6">
          <MetadataBlock
            header={
              <>
                <CalendarIcon width={"19px"} color="#141B34" />
                <p className="text-base lg:text-lg font-semibold">
                  {t("transcript.date")}
                </p>
              </>
            }
            footer={
              <div className="pl-2.5">
                {formattedDate ? (
                  <p className="text-xs md:text-sm lg:text-base 2xl:text-lg md:font-medium">
                    {formattedDate}
                  </p>
                ) : (
                  <p className="pt-1.5 text-xs md:text-sm lg:text-sm 2xl:text-base md:font-medium">
                    {t("transcript.not-available")}
                  </p>
                )}
              </div>
            }
          />
          {/* render only 3 tags*/}
          <MetadataBlock
            header={
              <>
                <BookmarkIcon width={"19px"} color="#000000" />
                <p className="text-base lg:text-lg font-semibold">
                  {t("shared.topics")}
                </p>
              </>
            }
            footer={
              <div className="flex flex-wrap gap-2">
                {topics && topics.length > 0 ? (
                  topics.map((topic) => (
                    <Pill
                      key={topic.slug}
                      kind="link"
                      name={topic.name}
                      slug={getIsolatedFacetLink({
                        filter_field: "tags",
                        filter_value: topic.slug,
                        language: lang,
                      })}
                    />
                  ))
                ) : (
                  <p className="pl-2.5 pt-1.5 text-xs md:text-sm lg:text-sm 2xl:text-base md:font-medium">
                    {t("transcript.not-available")}
                  </p>
                )}
              </div>
            }
          />

          <MetadataBlock
            header={
              <>
                <MicIcon width={"19px"} color="#000000" />
                <p className="text-base lg:text-lg font-semibold">
                  {t("shared.speakers")}
                </p>
              </>
            }
            footer={
              <div className="flex flex-wrap gap-2">
                {speakers && speakers.length > 0 ? (
                  speakers.map((speaker) => (
                    <Pill
                      key={speaker}
                      kind="link"
                      name={speaker}
                      slug={getIsolatedFacetLink({
                        filter_field: "authors",
                        filter_value: speaker,
                        language: lang,
                      })}
                    />
                  ))
                ) : (
                  <p className="pl-2.5 pt-1.5 text-xs md:text-sm lg:text-sm 2xl:text-base md:font-medium">
                    {t("transcript.not-available")}
                  </p>
                )}
              </div>
            }
          />

          <MetadataBlock
            header={
              <>
                <Image
                  src="/svgs/pencil-icon.svg"
                  alt="pencil icon"
                  width={24}
                  height={24}
                  className="w-5"
                />
                <p className="text-base  lg:text-lg font-semibold">
                  {t("transcript.transcript_by")}
                </p>
              </>
            }
            footer={
              <div className="pl-5 pt-1.5 flex items-center ">
                {isAiGenerated ? (
                  <>
                    <a
                      href="https://review.btctranscripts.com/"
                      className="text-blue-custom-100 no-underline border-b border-blue-custom-100 max-w-[max-content] text-sm 2xl:text-base flex gap-1 items-start cursor-pointer"
                    >
                      <AiGeneratedIcon className="-mt-0.5" />
                      <span>{t("transcript.ai-generated")}</span>
                    </a>{" "}
                  </>
                ) : (
                  <p className="text-xs md:text-sm lg:text-sm 2xl:text-base md:font-medium">
                    {transcriptBy}
                  </p>
                )}
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

const MetadataBlock = ({
  header,
  footer,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 border-b pb-3  border-dashed border-gray-custom-1600">
      <div className="flex items-center gap-1">{header}</div>
      <div>{footer}</div>
    </div>
  );
};

export default TranscriptMetadataComponent;
