import { LanguageCode } from "@/config";
import { t } from "@/lib/translate";

export default function useTranslations(lang: LanguageCode) {
  return function (key: string) {
    return t(key, lang);
  };
}