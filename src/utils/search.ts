
export function matchCharactersWithRegex(word: string, searchTerm: string) {
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regexPattern = escapedSearchTerm
    .split("")
    .map((char) => `(?=.*${char})`)
    .join("");

  const regex = new RegExp(regexPattern, "i"); // 'i' flag for case-insensitive matching

  return regex.test(word);
}
