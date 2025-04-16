import React from "react";
import Wrapper from "@/components/layout/Wrapper";
import { processFlowData } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import FooterComponent from "@/components/layout/FooterComponent";
import { ArrowLinkRight } from "@bitcoin-dev-project/bdp-ui/icons";
import reviewers from "@/public/reviewers-data.json";
import upperLineIcon from "@/public/svgs/upper-line-icon.svg";
import lowerLineIcon from "@/public/svgs/lower-line-icon.svg";
import { LanguageCode } from "@/config";
import useTranslations from "@/hooks/useTranslations";
import DottedLines from "@/components/svgs/Line";
import DottedLinesMobile from "@/components/svgs/LineMobile";

const About = ({
  languageCode = LanguageCode.en,
}: {
  languageCode?: LanguageCode;
}) => {
  const t = useTranslations(languageCode);
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Wrapper className="text-black flex flex-col max-sm:px-3">
        <div className="text-center py-10 md:py-[104px] flex flex-col items-center justify-center">
          <h1 className="text-[40px] leading-[48px] font-medium md:text-6xl 2xl:text-7xl">
            {t(`about.title`)}
          </h1>
          <p className="text-base md:text-xl 2xl:text-2xl 2xl:leading-[33.84px] md:max-w-[1050px] max-w-[1195px] pt-10 md:pt-12 2xl:pt-14 text-center w-full">
            {t(`about.description`)}
          </p>
        </div>
      </Wrapper>

      <div className="bg-gray-custom-900 w-full">
        <Wrapper className="py-16 md:py-[104px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-8 lg:gap-[52px] max-sm:px-3">
          <section className="max-w-full md:max-w-[50%]">
            <h1 className="text-[40px] text-center md:text-start leading-[48px] font-medium md:text-5xl 2xl:text-6xl">
              {t(`about.history.title`)}
            </h1>
            <p className="text-base lg:text-xl 2xl:text-2xl 2xl:leading-[33.84px] pt-10 md:pt-6 max-w-[738px]">
              {t(`about.history.content-1`)}
              <br />
              <br />
              {t(`about.history.content-2`)}
              <br />
              <br />
              {t(`about.history.content-3`)}
            </p>
          </section>

          <section className="w-full rounded-[20px] max-md:rounded-[10px] overflow-hidden grow max-w-[50%] max-h-[587px] max-md:max-w-full max-md:max-h-[500px] max-[400px]:max-h-[261px]">
            <video
              src="/clips/bryan-typing-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </section>
        </Wrapper>
      </div>

      <div className="w-full relative">
        <div className="absolute top-0 right-0 left-0 w-full -z-10">
          <Image
            src={upperLineIcon}
            alt="upper line icon"
            className=" w-full"
          />
        </div>

        <Wrapper className="flex flex-col gap-6 max-sm:px-3 py-10 md:py-[104px] max-w-[1345px]">
          <div className="text-center pb-10 md:pb-16 flex flex-col items-center justify-center">
            <h1 className="text-[40px] leading-[48px] font-medium md:text-6xl 2xl:text-7xl">
              {t(`about.process.title`)}
            </h1>
            <p className="text-base md:text-xl 2xl:text-2xl 2xl:leading-[33.84px] md:max-w-[1050px] max-w-[1195px] pt-10 md:pt-12 2xl:pt-14">
              {t(`about.process.description`)}
            </p>
          </div>

          <div className="flex flex-col gap-10 md:gap-20 relative overflow-y-hidden overflow-x-hidden">
            <div className="hidden md:flex min-w-24 h-24 md:min-w-[184px] md:h-[184px] absolute justify-center">
              <DottedLines className="z-0" />
            </div>
            <div className="flex md:hidden min-w-24 h-24 md:min-w-[184px] md:h-[184px] absolute justify-center">
              <DottedLinesMobile className="z-0" />
            </div>

            {processFlowData.map(({ id, image, bgColor }) => (
              <div
                key={id}
                className="flex flex-row z-10 items-center gap-4 sm:gap-[31px]"
              >
                <section
                  className={`bg-[${bgColor}] flex items-center justify-center min-w-24 h-24 md:min-w-[184px] md:h-[184px] rounded-2xl`}
                  style={{ backgroundColor: bgColor }}
                >
                  <Image
                    src={image}
                    alt={id}
                    width={64}
                    height={64}
                    className="w-7 md:w-16 h-7 md:h-16"
                  />
                </section>

                <section>
                  <p className="text-lg md:text-2xl font-medium whitespace-nowrap">
                    {t(`about.process.${id}.title`)}
                  </p>
                  <p className="text-sm md:text-xl pt-1 sm:pt-3 lg:pt-[31px]">
                    {t(`about.process.${id}.content`)}{" "}
                    {id === "review" ? (
                      <span>
                        <Link
                          href="https://review.btctranscripts.com/"
                          target="_blank"
                          className="underline text-orange-custom-100"
                        >
                          {t(`about.process.cta`)}
                        </Link>
                      </span>
                    ) : null}
                  </p>
                </section>
              </div>
            ))}
          </div>
        </Wrapper>

        <div className="absolute bottom-0 right-0 left-0 w-full -z-10">
          <Image
            src={lowerLineIcon}
            alt="lower line icon"
            className=" w-full"
          />
        </div>
      </div>

      <div>
        <Wrapper className="flex flex-col gap-16 md:gap-[72px] max-sm:px-3 py-10 md:py-[104px]">
          {/* <GroupedImageSection
            title='Editors'
            subText='Editors evaluate and finalize Reviewers submissions, ensuring they’re consistently high quality.'
            data={editors}
          /> */}

          <GroupedImageSection
            title={t("about.reviewers.title")!}
            subText={t("about.reviewers.description")!}
            data={reviewers}
            buttonText={t("about.reviewers.cta")!}
            href="https://review.btctranscripts.com"
          />
          {/* <GroupedImageSection
            title='Curators'
            subText='Curators suggest source material for transcription, setting the foundation for all that follows.'
            data={curators}
            buttonText='Become a Curator'
            href='/'
          /> */}
        </Wrapper>
      </div>
      <FooterComponent />
    </main>
  );
};

const GroupedImageSection = ({
  title,
  subText,
  data,
  buttonText,
  href,
}: {
  data: Record<string, { title: string; image: string }>;
  title: string;
  subText: string;
  href?: string;
  buttonText?: string;
}) => {
  return (
    <div className="text-center">
      <h1 className="text-[40px] leading-[48px] font-medium md:text-6xl 2xl:text-7xl">
        {title}
      </h1>
      <p className="text-base md:text-xl 2xl:text-2xl 2xl:leading-[33.84px] md:max-w-[1050px] max-w-[1195px] pt-4 md:pt-6">
        {subText}
      </p>

      <div className="flex items-center justify-center pt-8 md:pt-14">
        <div className="flex gap-5 md:gap-5 max-w-[1060px] flex-wrap justify-center">
          {Object.values(data).map(({ title, image }) => (
            <Link
              href={`https://github.com/${title}`}
              key={title}
              target="_blank"
              className="flex flex-col items-center justify-center w-[150px] md:w-[160px] max-[340px]:w-[130px] gap-2 md:px-[14px]"
            >
              <Image
                src={image}
                alt={title}
                width={132}
                height={132}
                className="w-[100px] md:w-[132px] h-[100px] md:h-[132px] bg-black rounded-full border-[0.5px]"
              />
              <p className="text-custom-black-custom-400 text-sm leading-[22.12px] font-medium md:text-base md:font-semibold md:leading-[25.28px] whitespace-nowrap max-w-full text-nowrap overflow-hidden text-ellipsis">
                {title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {buttonText && href ? (
        <div className="pt-4 md:pt-6 flex justify-center">
          <Link
            href={href}
            target="_blank"
            className=" text-base font-semibold md:text-lg flex items-center justify-center gap-1 rounded-full bg-orange-custom-100 text-white py-[17px] px-[34px] md:py-6 md:px-16"
          >
            {buttonText}
            <ArrowLinkRight />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default About;
