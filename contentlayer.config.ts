import * as fs from "fs";
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer2/source-files";

const Resources = defineNestedType(() => ({
  name: "Resources",
  fields: {
    title: { type: "string" },
    url: { type: "string" },
  },
}));

export const generateDocuTypes = () => {
  const getFolders = fs.readdirSync(`${process.cwd()}/public/bitcoin-transcript`, "utf-8");
  const folders = getFolders.slice(6).filter((item) => item !== "twitter_handles.json");

  const DefinedDocumentTypes = folders.map((name) => {
    const slugifyName = name
      .split("-")
      .map((text) => text.replace(/(^\w{1})|(\s+\w{1})/g, (text) => text.toUpperCase()))
      .join("");

    return defineDocumentType(() => ({
      name: slugifyName,
      filePathPattern: `${name}/**/*.md`,
      contentType: "markdown",
      fields: {
        title: { type: "string" },
        speakers: { type: "list", of: { type: "string" } },
        date: { type: "date" },
        transcript_by: { type: "string" },
        Transcript_by: { type: "string" },
        categories: { type: "list", of: { type: "string" } },
        tag: { type: "list", of: { type: "string" } },
        tags: { type: "list", of: { type: "string" } },
        media: { type: "string" },
        translation_by: { type: "string" },
        episode: { type: "number" },
        aliases: { type: "list", of: { type: "string" } },
        vídeo: { type: "string" },
        video: { type: "string" },
        hosts: { type: "list", of: { type: "string" } },
        source: { type: "string" },
        transcription_coverage: { type: "string" },
        summary: { type: "string" },
        needs: { type: "string" },
        additional_resources: { type: "list", of: Resources },
        weight: { type: "number" },
      },
    }));
  });

  return { DefinedDocumentTypes };
};

export const generateExcludedPaths = () => {
  const otherPaths = [
    ".github",
    ".gitignore",
    "LICENSE.md",
    "README.md",
    "twitter_handles.json",
    ".json",
    "2018-08-17-richard-bondi-bitcoin-cli-regtest.es.md",
  ];
  const path = `${process.cwd()}/public/bitcoin-transcript`;

  const getFolders = fs.readdirSync(path, "utf-8");
  const folders = getFolders.slice(6).filter((item) => item !== "twitter_handles.json");

  const indexFiles: string[] = [];
  const indexFilesInFolders: string[] = [];

  for (let i = 0; i < folders.length; i++) {
    const name = folders[i];
    const files = fs.readdirSync(`${path}/${folders[i]}`);
    const isDirectory = files.filter((num: string) => /^-?\d+$/.test(num));

    if (isDirectory.length) {
      isDirectory
        .map((year) => {
          const text = `${name}/${year}/_index.md ${name}/${year}/_index.zh.md ${name}/${year}/_index.es.md`;

          return text;
        })
        .map((text) => indexFilesInFolders.push(...text.split(" ")));
    }
  }

  folders
    .map((folder) => {
      const text = `${folder}/_index.md ${folder}/_index.zh.md ${folder}/_index.es.md`;

      return text;
    })
    .map((text) => indexFiles.push(...text.split(" ")));

  const foldersToExclude = [...otherPaths, ...indexFiles, ...indexFilesInFolders];

  return { foldersToExclude };
};

const { DefinedDocumentTypes } = generateDocuTypes();
const { foldersToExclude } = generateExcludedPaths();

export default makeSource({
  contentDirPath: "public/bitcoin-transcript/",
  documentTypes: DefinedDocumentTypes,
  contentDirExclude: foldersToExclude,
});
