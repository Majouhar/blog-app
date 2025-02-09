import prisma from "@/prisma/client";
import { StatusCode } from "@/utils/constants";
import { GlobalError } from "@/utils/Exceptions";
import { Blog } from "@prisma/client";
import { getAuthUserEmail } from "./authAction";

export async function getAllPublishedBlogs(
  filter: Blog,
  page: number,
  size: number
) {
  const [blogs, count] = await Promise.all([
    prisma.blog.findMany({
      where: {
        title: {
          contains: filter.title ?? "",
          mode: "insensitive",
        },
        content: {
          contains: filter.content ?? "",
          mode: "insensitive",
        },
        published: true,
      },
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
      skip: page * size,
      take: size,
    }),
    prisma.blog.count({
      where: {
        title: {
          contains: filter.title ?? "",
          mode: "insensitive",
        },
        content: {
          contains: filter.content ?? "",
          mode: "insensitive",
        },
        published: true,
      },
    }),
  ]);
  return { blogs, count };
}

export async function getDrafts(filter: Blog, page: number, size: number) {
  const sessionEmail = await getAuthUserEmail();
  const [blogs, count] = await Promise.all([
    prisma.blog.findMany({
      where: {
        title: {
          contains: filter.title ?? "",
          mode: "insensitive",
        },
        content: {
          contains: filter.content ?? "",
          mode: "insensitive",
        },
        published: false,
        authorEmail: sessionEmail,
      },
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
      skip: page * size,
      take: size,
    }),
    prisma.blog.count({
      where: {
        title: {
          contains: filter.title ?? "",
          mode: "insensitive",
        },
        content: {
          contains: filter.content ?? "",
          mode: "insensitive",
        },
        published: false,
        authorEmail: sessionEmail,
      },
    }),
  ]);

  return { blogs, count };
}

export async function getBlog(blogId: number) {
  const sessionEmail = await getAuthUserEmail(true);
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
  const authEmail = await getAuthUserEmail();
  blog.authorEmail = authEmail;
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
  if (!blog.id) {
    throw new GlobalError(StatusCode.NOT_FOUND, "Blog Not Found");
  }
  const authEmail = await getAuthUserEmail();
  // eslint-disable-next-line
  const { id, authorEmail, createdAt, updatedAt, published, ...rest } = blog;
  //user won't be able to unpublish once published, but can delete
  const updatedBlog = await prisma.blog.update({
    where: {
      id: blog.id,
      authorEmail: authEmail,
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
  const authEmail = await getAuthUserEmail();
  // TODO(After auth check is this his own blog)
  const deletedBlog = await prisma.blog.delete({
    where: {
      id: blogId,
      authorEmail: authEmail,
    },
  });
  return !!deletedBlog;
}
