"use client";
import { GET_ALL_BLOGS, GET_ALL_DRAFTS } from "@/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Blog } from "@prisma/client";
import { BlogResponse } from "@/utils/types";

const BlogList = () => {
  const router = useRouter();
  const session = useSession();

  const [currentPage, setCurrentPage] = useState(1);
  const [isDrafts, setIsDrafts] = useState(false);

  const itemsPerPage = 5;

  const { data, loading, error } = useQuery(
    isDrafts ? GET_ALL_DRAFTS : GET_ALL_BLOGS,
    {
      variables: {
        page: currentPage - 1,
        size: itemsPerPage,
      },
    }
  );

  if (loading) return <Loader />;
  if (error) {
    throw new Error(error.message);
  }

  const blogs = isDrafts
    ? data?.getDrafts.blogs
    : data?.getAllPublishedBlogs.blogs;

  const totalPages = Math.ceil(
    (isDrafts ? data?.getDrafts.count : data?.getAllPublishedBlogs.count) /
      itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold  text-center">
          Blogs {isDrafts ? "(Drafts)" : ""}
        </h1>
        <div className="flex gap-2">
          {session.status == "authenticated" && (
            <button
              className={`${
                isDrafts
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } px-4 py-2 rounded-lg  text-white `}
              onClick={() => setIsDrafts((prev) => !prev)}
            >
              {isDrafts ? "All Blogs" : "Drafts"}
            </button>
          )}
          <button
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
            onClick={() => router.push("/manage")}
          >
            Add Blog
          </button>
        </div>
      </div>
      <div className="max-h-128 ">
        {blogs.map((blog: BlogResponse) => (
          <div
            onClick={() => router.push(`/${blog.id}`)}
            key={blog.id}
            className="p-4 rounded-lg border shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-600">By {blog.author.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <p className="text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
