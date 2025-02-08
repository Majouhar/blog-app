"use client";
import { GET_ALL_BLOGS } from "@/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { Blog } from "@prisma/client";

if (process.env.NODE_ENV == "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
const BlogsPage = () => {
  const { data, loading, error } = useQuery(GET_ALL_BLOGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const blogs = data?.getAllPublishedBlogs?.blogs;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>
      {blogs.length == 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog: Blog & { author: { name: string } }) => (
          <p key={blog.id}>
            {blog.title},{blog.author.name}
          </p>
        ))
      )}
    </div>
  );
};

export default BlogsPage;
