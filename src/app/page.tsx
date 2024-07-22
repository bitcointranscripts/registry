import * as fs from "fs";
import Link from "next/link";

export default function Home() {
  const path = `${process.cwd()}/public/bitcoin-transcript`;

  const getTranscriptList = () => {
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

  const firstLetterRegex = /(^\w{1})|(\s+\w{1})/g;
  const { list } = getTranscriptList();

  return (
    <main className='bg-white'>
      <div className='p-8'>
        <div>
          <div className='flex flex-col gap-4 p-6 cursor-pointer border border-[#cecece] rounded-[0.5px] w-fit'>
            {list.map((list) => (
              <Link key={list} href={`transcript/${list}`} className='border border-[#cecece] p-6 bg-[#fffcf9] text-[#4d4d4d] hover:bg-transparent'>
                {list
                  .split("-")
                  .map((text) => text.replace(firstLetterRegex, (text) => text.toUpperCase()))
                  .join(" ")}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <section></section>
    </main>
  );
}
