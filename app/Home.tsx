"use client";
import { GET_ALL_BLOGS, GET_ALL_DRAFTS } from "@/graphql/queries/blogQueries";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import { BlogResponse } from "@/utils/types";
import Button from "./components/Button";
import useResponsive from "./hooks/useResponsive";
import useDebounce from "./hooks/useDebounce";

const BlogList = () => {
  const router = useRouter();
  const session = useSession();
  const { isSmallScreen, isMediumScreen } = useResponsive();

  const debounce = useDebounce();

  const [currentPage, setCurrentPage] = useState(1);
  const [isDrafts, setIsDrafts] = useState(false);
  const [search, setSearch] = useState("");

  const itemsPerPage = isSmallScreen ? 6 : isMediumScreen ? 2 : 3;

  const { data, loading, error } = useQuery(
    isDrafts ? GET_ALL_DRAFTS : GET_ALL_BLOGS,
    {
      variables: {
        filter: { title: search },
        page: currentPage - 1,
        size: itemsPerPage,
      },
      fetchPolicy: "no-cache",
    }
  );

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
  const handleSearch = (value: string) => {
    debounce(() => {
      setCurrentPage(1);
      setSearch(value);
    }, 1000)();
  };

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto  p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-0 md:mb-6">
          <h1 className="text-lg md:text-3xl font-bold  ">
            Blogs {isDrafts ? "(Drafts)" : ""}
          </h1>
          <input
            placeholder={"Search "}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-32 sm:w-64 text-xs sm:text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base lg:py-3"
          />
          <div className="flex gap-2">
            {session.status == "authenticated" && (
              <Button
                className={
                  isDrafts
                    ? "bg-gray-500 hover:bg-gray-600 text-white"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }
                onClick={() => setIsDrafts((prev) => !prev)}
                label={isDrafts ? "All Blogs" : "Drafts"}
              />
            )}
            <Button
              className={"bg-green-500 hover:bg-green-600 text-white"}
              onClick={() => router.push("/manage")}
              label={" Add Blog"}
            />
          </div>
        </div>
        {totalPages == 0 ? (
          <div className="h-24 flex items-center justify-center ">
            <p className="text-sm sm:text-md">No Blogs Available!!!</p>
          </div>
        ) : (
          blogs && (
            <div className="max-h-128 sm:max-h-80  ">
              {blogs.map((blog: BlogResponse) => (
                <div
                  onClick={() => router.push(`/${blog.id}`)}
                  key={blog.id}
                  className="p-2 md:p-4 rounded-lg border shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <h2 className="text-md md:text-xl font-semibold">
                    {blog.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600">
                    By {blog.author.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )
        )}

        {totalPages > 0 && (
          <div className="flex justify-between items-center mt-2 sm:mt-3 md:mt-6">
            <Button
              className={
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              label={"Previous"}
            />
            <p className="text-xs sm:text-sm">
              Page {currentPage} of {totalPages}
            </p>
            <Button
              className={
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              label={"Next"}
            />
          </div>
        )}
      </div>

      {loading && <Loader />}
    </>
  );
};

export default BlogList;
