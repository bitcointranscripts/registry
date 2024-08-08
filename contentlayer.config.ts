import * as fs from "fs";
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import { TranscriptFields } from "./src/types/index";
import { getTranscriptList } from "./src/utils/index";

const path = `${process.cwd()}/public/bitcoin-transcript`;

const generateDocuTypes = () => {
  const { list: folders } = getTranscriptList();

  // firstLetterRegex: ** /(^\w{1})|(\s+\w{1})/g ** gets the first letter of the split folder name and capitalizes the first letter of the each word. This is to create a camelCase naming Convention for the generated folders
  const firstLetterRegex = /(^\w{1})|(\s+\w{1})/g;

  const DefinedDocumentTypes = folders.map((name) => {
    const slugifyName = name
      .split("-")
      .map((text) => text.replace(firstLetterRegex, (text) => text.toUpperCase()))
      .join("");

    return defineDocumentType(() => ({
      name: slugifyName,
      filePathPattern: `${name}/**/*.md`,
      contentType: "markdown",
      fields: TranscriptFields,
    }));
  });

  return { DefinedDocumentTypes };
};

const generateExcludedPaths = () => {
  const otherPaths = [
    ".github",
    ".gitignore",
    ".json",
    "2018-08-17-richard-bondi-bitcoin-cli-regtest.es.md",
    "LICENSE.md",
    "README.md",
    "STYLE.md",
    "twitter_handles.json",
  ];

  const { list: folders } = getTranscriptList();
  const indexFiles: string[] = [];
  const indexFilesInFolders: string[] = [];

  for (let i = 0; i < folders.length; i++) {
    const name = folders[i];
    const files = fs.readdirSync(`${path}/${folders[i]}`);

    // isNumRegex: ** /^-?\d+$/ ** checks if file name is a digit. We're using it to check for folders that have transcripts grouped in years.
    const isNumRegex = /^-?\d+$/;
    const isDirectory = files.filter((num: string) => isNumRegex.test(num));

    if (isDirectory.length) {
      isDirectory.map((year) => {
        const text = `${name}/${year}/_index.md ${name}/${year}/_index.zh.md ${name}/${year}/_index.es.md`;
        indexFilesInFolders.push(...text.split(" "));
      });
    }
  }

  folders.map((folder) => {
    const text = `${folder}/_index.md ${folder}/_index.zh.md ${folder}/_index.es.md`;

    indexFiles.push(...text.split(" "));
  });

  const foldersToExclude = [...otherPaths];

  return { foldersToExclude };
};

const { DefinedDocumentTypes } = generateDocuTypes();
const { foldersToExclude } = generateExcludedPaths();

export default makeSource({
  contentDirPath: "public/bitcoin-transcript/",
  documentTypes: DefinedDocumentTypes,
  contentDirExclude: foldersToExclude,
});
