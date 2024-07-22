import React from "react";
import * as fs from "fs";
import { slugify } from "../../../utils";
import Link from "next/link";

const getTranscriptPageData = async (path: string[]) => {
  try {
    const pathString = path.join("/");
    const { sluggifiedString } = slugify(pathString);

    const routeData = fs.readdirSync(`${process.cwd()}/.contentlayer/generated/${sluggifiedString}`, "utf-8");

    const subfolders: Record<string, Array<Array<string>>> = {};

    const folders = routeData
      .map((route) => {
        const splitRoutes = route.split("__");

        if (splitRoutes[1] && splitRoutes.length === 3) {
          const subKey = `${splitRoutes[1]}`;

          if (!subfolders[subKey]) {
            subfolders[subKey] = [];
          }
          subfolders[subKey].push(splitRoutes);
        } else {
          return splitRoutes.join("__");
        }
      })
      .filter((route) => route !== undefined);

    return { folders, subfolders };
  } catch (error) {
    return null;
  }
};

const getDataFromSubfolder = (path: string[]) => {
  const [folder, subfolder] = path;
  const { sluggifiedString } = slugify(folder);

  const routeData = fs.readdirSync(`${process.cwd()}/.contentlayer/generated/${sluggifiedString}`, "utf-8");

  const subfolderFiles = routeData.filter((file) => file.split("__")[1] === subfolder && file.endsWith("md.json"));

  return { subfolderFiles };
};

const readJsonFiles = async (path: string[], isSubDirectory: boolean) => {
  const [folder, subfolder, jsonPath] = path;

  const { sluggifiedString } = slugify(folder);
  const subPath = isSubDirectory ? "" : subfolder;
  let newPath = [sluggifiedString, subPath, jsonPath].join("/");
  newPath = newPath.endsWith("/") ? newPath.slice(0, newPath.length - 1) : newPath;

  try {
    const data = fs.readFileSync(`${process.cwd()}/.contentlayer/generated/${newPath}`, "utf-8");
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error) {
    return null;
  }
};

export default async function Page({ params }: { params: { path: string[] } }) {
  const pathString = params.path.join("/");
  const { path } = params;

  const homePath = path.length === 1;
  const subfolderPath = path.length === 2 && !path[path.length - 1].endsWith("md.json");
  const isSubDirectory = path.length === 3;

  const transcriptData = await getTranscriptPageData(path);
  const { subfolderFiles } = getDataFromSubfolder(path);
  const jsonFile = await readJsonFiles(path, isSubDirectory);

  const folders = transcriptData?.folders! && transcriptData?.folders;
  const subfolders = transcriptData?.subfolders! && transcriptData?.subfolders;

  return (
    <div className='p-5 text-black'>
      <div className='flex justify-between items-center py-6'>
        <h2 className='font-bold text-2xl capitalize pb-2 text-black'>{path.join(" ")}</h2>
        <Link className='px-4 py-2 border rounded-md h-fit text-base capitalize pb-2 text-black border-black' href='/'>
          Home
        </Link>
      </div>

      {/* SUB FOLDER OPEN */}
      <div>
        {homePath && (
          <>
            {Object.keys(subfolders).length ? <p className='font-bold text-2xl capitalize pb-2 text-black'>Sub Folders</p> : null}
            <div className='flex flex-col gap-5'>
              {Object.entries(subfolders).map(([key, value]) => (
                <CustomLink href={`${pathString}/${key}`} text={key.split("_").join(" ")} key={key} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* SUBFOLDERFILES */}
      {subfolderPath && (
        <>
          <div className='flex flex-col gap-5'>
            {subfolderFiles.map((subF) => (
              <Link
                key={subF}
                className='border border-[#cecece] p-6 bg-[#fffcf9] text-[#4d4d4d] hover:bg-transparent cursor-pointer'
                href={`${path[1]}/${subF}`}
              >
                {subF}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* SUB FOLDER CLOSE */}

      {/* FOLDER FILES */}
      {homePath && (
        <div>
          <p className='py-6 pb-2 font-bold text-2xl capitalize text-black'>Folders</p>
          <div className='flex flex-col gap-5'>
            {folders.map((sub) => (
              <CustomLink href={`${path.join("")}/${sub}`} text={sub} key={sub!} />
            ))}
          </div>
        </div>
      )}

      {/* DISPLAY JSON FILE CONTENT SECTION */}
      {jsonFile && (
        <div>
          <h1 className='text-2xl underline font-semibold pb-4'>{jsonFile.title}</h1>
          <div className='text-justify' dangerouslySetInnerHTML={{ __html: jsonFile.body.raw }}></div>
        </div>
      )}
    </div>
  );
}

const CustomLink = ({ href, text, key }: { href: string; text: string | undefined; key: string }) => {
  return (
    <Link href={href} key={key} className='border border-[#cecece] p-6 bg-[#fffcf9] text-[#4d4d4d] hover:bg-transparent max-w-[500px]'>
      {text}
    </Link>
  );
};
