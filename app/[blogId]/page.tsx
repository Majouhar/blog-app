import React from "react";
import SingleBlogPage from "./Blog";

async function page({
  params,
}: Readonly<{ params: Promise<{ blogId: string }> }>) {
  const blogId = (await params).blogId;
  return <SingleBlogPage blogId={blogId} />;
}

export default page;
