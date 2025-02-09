"use client";
import {
  CREATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
} from "@/graphql/queries/blogQueries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
const EditBlogPage = ({ blogId }: Readonly<{ blogId?: number }>) => {
  const router = useRouter();
  const session = useSession();

  const [fetchBlog, { data, loading, error }] = useLazyQuery(GET_BLOG);
  const [addBlog, { loading: addLoading }] = useMutation(CREATE_BLOG, {
    onCompleted(data) {
      const blog = data.createBlog;
      if (!blog.published) {
        router.push(`/${blog.id}`);
      } else {
        router.back();
      }
    },
    onError(error) {
      throw new Error(error.message);
    },
  });
  const [updateBlog, { loading: updateLoading }] = useMutation(UPDATE_BLOG, {
    onCompleted() {
      router.back();
    },
    onError(error) {
      throw new Error(error.message);
    },
  });
  const [deleteBlog, { loading: deleteLoading }] = useMutation(DELETE_BLOG, {
    onCompleted() {
      router.push("/");
    },
    onError(error) {
      throw new Error(error.message);
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
    if (isBlogAvailable && sessionEmail!= blog.authorEmail) {
      router.back();
    } else if (isBlogAvailable) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog, isBlogAvailable, blogId]);

  useEffect(() => {
    if (error && error.message == "Blog Not Found") {
      router.push("/manage");
    }
  }, [error]);

  if (loading || updateLoading || deleteLoading || addLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

   
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
      {((blogId && hasPermissionToModify) || !blogId) && (
        <button
          onClick={() => handleSave(false)}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          {hasPermissionToModify && blog?.published
            ? "Save Changes"
            : "Save Draft"}
        </button>
      )}
      {!blog?.published && (
        <button
          onClick={() => handleSave(true)}
          className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Publish
        </button>
      )}
      {hasPermissionToModify && (
        <button
          onClick={handleDelete}
          className="ml-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      )}

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
