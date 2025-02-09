"use client";
import { GET_BLOG } from "@/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const SingleBlogPage: React.FC<{ blogId: string }> = ({ blogId }) => {
  const session = useSession();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: {
      blogId: isNaN(Number(blogId)) ? -1 : Number(blogId),
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (loading) return <Loader />;
  const blog = data?.getBlog;
  if (blog)
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="mb-4 text-gray-600">
          <p>
            <span className="font-medium">Author:</span> {blog.author.name} (
            {blog.authorEmail})
          </p>
          <p>
            <span className="font-medium">Created on:</span>{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Updated on:</span>{" "}
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {blog.content}
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          {session.status == "authenticated" &&
            session.data.user?.email == blog.authorEmail && (
              <button
                onClick={() => router.push(`/manage/${blog.id}`)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
            )}
          <button
            onClick={() => router.replace("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return <></>;
};

export default SingleBlogPage;
