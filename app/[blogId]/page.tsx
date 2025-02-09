import React from "react";
import SingleBlogPage from "./Blog";

async function page({ params }: Readonly<{ params: { blogId: string } }>) {
  //Next js throwing unwanted warning for not using await
  const blogId = await params
  return <SingleBlogPage blogId={blogId.blogId} />;
}

export default page;
