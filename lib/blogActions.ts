import prisma from "@/prisma/client";
import { StatusCode } from "@/utils/constants";
import { GlobalError } from "@/utils/Exceptions";
import { Blog } from "@prisma/client";

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
      skip: page,
      take: size,
    }),
    prisma.blog.count({
      where: {
        published: true,
      },
    }),
  ]);

  return { blogs, count };
}
export async function getBlog(blogId: number) {
  //TODO(if not published then hide from other users - after auth)
  const blog = await prisma.blog.findMany({
    where: { id: blogId, published: true },
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
    },
  });
  if (!blog) {
    throw new GlobalError(StatusCode.NOT_FOUND, "Blog Not Found");
  }
  return blog;
}
export async function createBlog(blog: Blog) {
  const createdBlog = await prisma.blog.create({
    data: blog,
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
  return deletedBlog;
}
