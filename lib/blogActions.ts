import prisma from "@/prisma/client";
import { hasAllKeys } from "@/utils/basicUtility";
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
  const updatedBlog = await prisma.blog.update({
    where: {
      id: blog.id,
    },
    data: blog,
  });
  return updatedBlog;
}

export async function deleteBlog(blog: Blog) {
  // TODO(After auth check is this his own blog)
  const deletedBlog = await prisma.blog.delete({
    where: {
      id: blog.id,
    },
  });
  return deletedBlog;
}
