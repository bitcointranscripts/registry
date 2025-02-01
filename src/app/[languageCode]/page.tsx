import Home from "@/app/page";
import { LanguageCode, LanguageCodes } from "@/config";
import { deriveAlternateLanguages, getLangCode } from "@/utils";
import { notFound } from "next/navigation";

type PageDynamicProps = {
  params: {languageCode: string};
}

// forces 404 for paths not generated from `generateStaticParams` function.
export const dynamicParams = false;

export function generateStaticParams() {
  const topicLanguageSlugs = LanguageCodes.map((lang) => {
    return { languageCode: lang };
  });
  return topicLanguageSlugs;
}

export const generateMetadata = ({params}: PageDynamicProps) => {
  const languageCode = getLangCode(params.languageCode);
  if (languageCode instanceof Error) {
    return notFound();
  }

  const { alternateLanguages, metadataLanguages } = deriveAlternateLanguages({
    languageCode,
    languages: LanguageCodes,
    suffix: "",
  });

  return {
    alternates: {
      languages: metadataLanguages,
    },
    other: {
      alternateLanguages,
      language: languageCode,
    }
  }
}

export default function HomePage({params}: PageDynamicProps) {
  return <Home languageCode={params.languageCode as LanguageCode} />;
}
