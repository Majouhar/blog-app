"use client";
import { GET_BLOG } from "@/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Button from "../components/Button";

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
      <div className="max-w-4xl mx-auto  p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl md:text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="mb-4 text-gray-600">
          <p className="text-sm md:text-lg">
            <span>Author:</span> {blog.author.name} ({blog.authorEmail})
          </p>
          <p className="text-sm md:text-lg">
            <span>Created on:</span>{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm md:text-lg">
            <span>Updated on:</span>{" "}
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg md:text-2xl font-semibold mb-4">Content</h2>
          <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
            {blog.content}
          </p>
        </div>

        <div className="mt-6 flex gap-2">
          {session.status == "authenticated" &&
            session.data.user?.email == blog.authorEmail && (
              <Button
                onClick={() => router.push(`/manage/${blog.id}`)}
                className=" bg-blue-500 text-white  hover:bg-blue-600 "
                label="Edit"
              />
            )}
          <Button
            onClick={() => router.replace("/")}
            className="bg-blue-500 text-white  hover:bg-blue-600 "
            label="Go Back"
          />
        </div>
      </div>
    );

  return <></>;
};

export default SingleBlogPage;
