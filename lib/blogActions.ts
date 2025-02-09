import prisma from "@/prisma/client";
import { StatusCode } from "@/utils/constants";
import { GlobalError } from "@/utils/Exceptions";
import { Blog } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function getAllPublishedBlogs(
  filter: Blog,
  page: number,
  size: number
) {
  const [blogs, count] = await Promise.all([
    prisma.blog.findMany({
      where: { ...filter, published: true },
      select: {
        id: true,
        author: {
          select: {
            name: true,
          },
        },
        authorEmail: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: page*size,
      take: size,
    }),
    prisma.blog.count({
      where: {
        ...filter,
        published: true,
      },
    }),
  ]);

  return { blogs, count };
}

export async function getDrafts(filter: Blog, page: number, size: number) {
  const session = await getServerSession();
  const sessionEmail = session?.user?.email ?? "";
  const [blogs, count] = await Promise.all([
    prisma.blog.findMany({
      where: { ...filter, published: false, authorEmail: sessionEmail },
      select: {
        id: true,
        author: {
          select: {
            name: true,
          },
        },
        authorEmail: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: page*size,
      take: size,
    }),
    prisma.blog.count({
      where: {
        ...filter,
        published: false,
        authorEmail: sessionEmail,
      },
    }),
  ]);

  return { blogs, count };
}

export async function getBlog(blogId: number) {
  const session = await getServerSession();
  const sessionEmail = session?.user?.email ?? "";
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: {
      id: true,
      author: {
        select: {
          name: true,
        },
      },
      content: true,
      updatedAt: true,
      authorEmail: true,
      title: true,
      createdAt: true,
      published: true,
    },
  });

  if (!blog || (!blog.published && blog.authorEmail != sessionEmail)) {
    throw new GlobalError(StatusCode.NOT_FOUND, "Blog Not Found");
  }
  return blog;
}
export async function createBlog(blog: Blog) {
  const session = await getServerSession();
  blog.authorEmail = session?.user?.email ?? "";
  const createdBlog = await prisma.blog.create({
    data: blog,
    select: {
      id: true,
      author: {
        select: {
          name: true,
        },
      },
      content: true,
      updatedAt: true,
      authorEmail: true,
      title: true,
      createdAt: true,
      published: true,
    },
  });
  return createdBlog;
}

export async function updateBlog(blog: Blog) {
  // TODO(After auth check is this his own blog)
  if (!blog.id) {
    throw new GlobalError(StatusCode.NOT_FOUND, "Blog Not Found");
  }
  const { id, authorEmail, createdAt, updatedAt, published, ...rest } = blog;
  //user won't be able to unpublish once published, but can delete
  const updatedBlog = await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: { ...rest, published: published ? true : undefined },
    select: {
      id: true,
      author: {
        select: {
          name: true,
        },
      },
      content: true,
      updatedAt: true,
      authorEmail: true,
      title: true,
      createdAt: true,
      published: true,
    },
  });
  return updatedBlog;
}

export async function deleteBlog(blogId: number) {
  // TODO(After auth check is this his own blog)
  const deletedBlog = await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });
  return !!deleteBlog;
}
