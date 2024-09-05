import React from "react";
import { allTranscripts } from "contentlayer/generated";
import { notFound, redirect } from "next/navigation";
import path from "path";
import * as fs from "fs";

export function generateStaticParams() {
  return allTranscripts.map((transcript) => ({
    slug: transcript.slugAsParams,
  }));
}

export default function SlugPage({ params }: { params: { slug: string[] } }) {
  const slug = params?.slug || [];
  const slugString = slug.filter((part) => part !== "").join("/");

  if (slugString === "") {
    return notFound();
  }

  const contentPath = path.join(process.cwd(), "public", "gh-pages", slugString);
  const isDir = fs.lstatSync(contentPath).isDirectory();

  // This slug catches all requests that aren't defined (acts as a routeHandler - can return a response, redirect, etc)
  // pages from gh-pages have relative link to resources e.g (<script type=text/javascript src=/plugins/auto-complete.js>)
  // which creates a fetch for `/plugins/auto-complete.js` on basePath
  // This slug catches such request so we check against that by checking if route is not Directory
  // if not we redirect to the `gh-pages` appended with the slug as is. As the slug may be a module

  if (!isDir) {
    if (fs.existsSync(contentPath)) {
      redirect('/gh-pages/' + slugString);
    } else {
      return notFound();
    }
  }
  
  const htmlFile = path.join(contentPath, "index.html");
  if (!fs.existsSync(htmlFile)) {
    return notFound();
  }
  let page = fs.readFileSync(htmlFile, "utf8");
  
  return (
    <div dangerouslySetInnerHTML={{ __html: page }} />
  );
}
