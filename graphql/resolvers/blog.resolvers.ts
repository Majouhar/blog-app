import {
  getAllPublishedBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/lib/blogActions";

export const resolvers = {
  Query: {
    getAllPublishedBlogs: async (_: any, { filter, page, size }: any) => {
      return await getAllPublishedBlogs(filter, page, size);
    },
    getBlog: async (_: any, { blogId }: any) => {
      return await getBlog(blogId);
    },
  },
  Mutation: {
    createBlog: async (_: any, { blog }: any) => {
      return await createBlog(blog);
    },
    updateBlog: async (_: any, { blog }: any) => {
      return await updateBlog(blog);
    },
    deleteBlog: async (_: any, { id }: { id: number }) => {
      return await deleteBlog(id);
    },
  },
};

