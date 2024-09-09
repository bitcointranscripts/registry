import React from 'react'

const DynamicPage = ({ params }: { params: { slug: string[] } }) => {
  const slug = params.slug[0];
  return <div>Title: {slug.toUpperCase()}</div>;
};

export default DynamicPage;