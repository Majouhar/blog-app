"use client";
import { GET_ALL_BLOGS } from "@/graphql/queries/blogQueries";
import { GET_HELLO } from "@/graphql/queries/helloQueries";
import { useQuery } from "@apollo/client";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV == "development") {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}
const BlogsPage = () => {
  const { data, loading, error } = useQuery(GET_HELLO);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const blogs = data?.getAllPublishedBlogs?.blogs;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Published Blogs</h1>
      {blogs ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="space-y-4">{JSON.stringify(data)}</ul>
      )}
    </div>
  );
};

export default BlogsPage;
