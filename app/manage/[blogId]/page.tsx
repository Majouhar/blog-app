import React from "react";
import EditBlogPage from "../CreateBlog";

async function page({ params }: Readonly<{ params: Promise<{ blogId: string }> }>) {
  const blogId = (await params).blogId
  return <EditBlogPage blogId={blogId} />;
}

export default page;
