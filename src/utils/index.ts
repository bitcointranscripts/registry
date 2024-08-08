import * as fs from "fs";

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

/**
 * Gets the transcript list from the bitcoin-transcript folder
 */

export const getTranscriptList = () => {
  const path = `${process.cwd()}/public/bitcoin-transcript`;
  const listFilesFromPath = fs.readdirSync(path, "utf-8");
  let list: Array<string> = [];

  for (let i = 0; i < listFilesFromPath.length; i++) {
    const folder = listFilesFromPath[i];
    const transcriptPath = `${path}/${folder}`;

    const stat = fs.statSync(transcriptPath);
    const isFolder = !stat.isFile() && !folder.startsWith(".");

    if (isFolder) {
      list.push(folder);
    }
  }

  return { list };
};
