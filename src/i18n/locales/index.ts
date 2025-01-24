import { LanguageCode } from '@/config'
import en from './en'
import es from './es'


export type TranslationValue = string | TranslationObject;
export interface TranslationObject {
  [key: string]: TranslationValue;
}
export type Translations = Record<LanguageCode, TranslationObject>;


const locales: Translations = {
  en,
  es,
  pt: {},
  zh: {},
}

export default locales
