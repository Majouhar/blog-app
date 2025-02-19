const blogSchema = `
scalar Date

type Blog {
  id: Int
  author: User
  authorEmail: String
  title: String
  content: String
  createdAt: Date
  updatedAt: Date
  published: Boolean
}

type Query {
  getAllPublishedBlogs(filter: BlogInput, page: Int, size: Int): PaginatedBlogs
  getDrafts(filter: BlogInput, page: Int, size: Int): PaginatedBlogs
  getBlog(blogId: Int!): Blog
}

type Mutation {
  createBlog(blog: BlogInput!): Blog
  updateBlog(blog: BlogInput!): Blog
  deleteBlog(id: Int!): Boolean
}

input BlogInput {
  id: Int
  authorEmail: String
  title: String
  content: String
  published: Boolean
}

type PaginatedBlogs {
  blogs: [Blog]
  count: Int
}



`;
export default blogSchema;
