import React from "react";
import EditBlogPage from "../CreateBlog";

async function page({ params }: Readonly<{ params: { blogId: number } }>) {
  //Next js throwing unwanted warning for not using await
  const blogId = await params
  return <EditBlogPage blogId={blogId.blogId} />;
}

export default page;
