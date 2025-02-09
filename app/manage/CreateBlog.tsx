"use client";
import {
  CREATE_BLOG,
  DELETE_BLOG,
  GET_ALL_BLOGS,
  GET_BLOG,
  UPDATE_BLOG,
} from "@/graphql/queries/blogQueries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Blog } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
const EditBlogPage = ({ blogId }: Readonly<{ blogId?: number }>) => {
  const router = useRouter();
  const session = useSession();

  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();

  const [fetchBlog, { data, loading, error }] = useLazyQuery(GET_BLOG);
  const [addBlog, { data: addData, loading: addLoading, error: addError }] =
    useMutation(CREATE_BLOG, {
      onCompleted(data) {
        console.log(data)
        const blog = data.createBlog;
        if (!blog.published) {
          router.push(`/${blog.id}`);
        } else {
          router.back();
        }
      },
    });
  const [
    updateBlog,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_BLOG, {
    onCompleted() {
      router.back();
    },
  });
  const [
    deleteBlog,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_BLOG, {
    onCompleted() {
      router.push("/");
    },
  });
  const blog = data?.getBlog;
  const sessionEmail = session.data?.user?.email;
  const isBlogAvailable = !!blog?.authorEmail;
  const hasPermissionToModify =
    sessionEmail && sessionEmail == blog?.authorEmail;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = (isPublish: boolean) => {
    const blogData = { title, content, published: isPublish };
    if (isBlogAvailable) {
      updateBlog({
        variables: {
          blog: {
            id: blog.id,
            ...blogData,
          },
        },
      });
    } else {
      addBlog({
        variables: {
          blog: {
            ...blogData,
          },
        },
      });
    }
  };
  const handleDelete = () => {
    deleteBlog({ variables: { id: blog?.id } });
  };

  useEffect(() => {
    if (blogId) {
      fetchBlog({ variables: { blogId: Number(blogId) } });
    }
  }, [blogId]);

  useEffect(() => {
    if (isBlogAvailable) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [isBlogAvailable]);

  useEffect(() => {
    if (error && error.message == "Blog Not Found") {
      router.push("/manage");
    }
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

      {/* Blog Title */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Blog Content */}
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Author Info (Read-Only) */}
      {isBlogAvailable && (
        <div className="mb-4 text-gray-600">
          <p>
            <span className="font-medium">Author:</span> {blog.author.name} (
            {blog.authorEmail})
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Last Updated At:</span>{" "}
            {new Date(blog.updatedAt).toLocaleDateString()}
          </p>
        </div>
      )}
      {session.data?.user?.email &&
        session.data.user.email == blog?.authorEmail && <></>}
      <button
        onClick={() => handleSave(false)}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        {hasPermissionToModify && blog?.published
          ? "Save Changes"
          : "Save Draft"}
      </button>
      {!blog?.published && (
        <button
          onClick={() => handleSave(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Publish
        </button>
      )}
      {hasPermissionToModify && (
        <button
          onClick={handleDelete}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Delete
        </button>
      )}

      {/* Cancel Button */}
      <button
        onClick={() => router.back()}
        className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditBlogPage;
