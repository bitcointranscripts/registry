import React from "react";
import path from "path";
import * as fs from "fs";

const page = () => {
  const filePath = path.join(process.cwd(), "public", "gh-pages", "index.html");
  const page = fs.readFileSync(filePath, "utf8");
  return (
    <div dangerouslySetInnerHTML={{ __html: page }} />
  );
};

export default page;