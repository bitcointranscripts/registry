import { LanguageCode } from "@/config"
import { getLangCode } from "@/utils"
import { usePathname } from "next/navigation"

export default function useLang() {
  const pathName = usePathname() || ''
  const parts = pathName.split('/').filter((p) => p)
  const firstPart = parts.shift()

  const lang = getLangCode(firstPart)

  if (lang instanceof Error) {
    return LanguageCode.en
  }

  return lang
}