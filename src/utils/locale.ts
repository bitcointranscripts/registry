import { LanguageCode, LanguageCodes } from "@/config"

export function generateNewUrlForLanguage(pathname: string, language: string) {
  
  const languageCodes = LanguageCodes.map(code => code.toLowerCase()).join('|');
  const regexPattern = new RegExp(`^\\/(${languageCodes})(\\/|$)`, 'i')
  const pathnameWithoutLanguage = pathname.replace(regexPattern, '/')
  const newUrl = language === LanguageCode.en ? `${pathnameWithoutLanguage}` : `/${language}${pathnameWithoutLanguage}`;
  return newUrl;
}

export function parseLanguageString(language: string) {
  return LanguageCodes.find((lan) => lan === language) ?? LanguageCode.en;
}