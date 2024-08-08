/**
 * Splits a string by its hyphens (-) and changes its casing to camelCase
 * @param slug : string paramters
 */

export const slugify = (slug: string) => {
  const slugRegex = /(^\w{1})|(\s+\w{1})/g;

  const sluggifiedString = slug
    .split("-")
    .map((text) => text.replace(slugRegex, (text) => text.toUpperCase()))
    .join("");

  return { sluggifiedString };
};
