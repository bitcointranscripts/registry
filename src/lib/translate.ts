import { LanguageCode } from "@/config";
import translations, { Translations, TranslationValue } from "@/i18n/locales";

const defaultLocale = LanguageCode.en;

function getValueFromPath(obj: Translations, path: string): string | undefined {
  return path.split('.').reduce((acc: any, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return acc[part as keyof typeof acc];
    }
    return undefined;
  }, obj);
}

export function t(key: string, lang: LanguageCode) {

  const transalationForKey = getValueFromPath(translations, `${lang}.${key}`);
  
  if (!transalationForKey) {
    const englishFallback = getValueFromPath(translations, `${defaultLocale}.${key}`);
    return englishFallback
  };

  return transalationForKey;
}
