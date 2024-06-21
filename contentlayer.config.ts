import { defineDocumentType, makeSource, ComputedFields } from "contentlayer2/source-files";

// this is a basic example to show how to structure your content source
export const _DataName = defineDocumentType(() => ({
  name: "Post", // name of the post
  filePathPattern: `**/*.md`, // file path where the mdx file to be process is located
  contentType: "mdx", // content type mdx
  // fields: types desc
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: "posts", documentTypes: [_DataName] });
