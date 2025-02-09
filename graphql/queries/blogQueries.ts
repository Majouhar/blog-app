import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs($filter: BlogInput, $page: Int, $size: Int) {
    getAllPublishedBlogs(filter: $filter, page: $page, size: $size) {
      blogs {
        id
        title
        author {
          name
        }
        createdAt
      }
      count
    }
  }
`;
export const GET_ALL_DRAFTS = gql`
  query GetAllDrafts($filter: BlogInput, $page: Int, $size: Int) {
    getDrafts(filter: $filter, page: $page, size: $size) {
      blogs {
        id
        title
        author {
          name
        }
        createdAt
      }
      count
    }
  }
`;


export const GET_BLOG = gql`
  query GetBlog($blogId: Int!) {
    getBlog(blogId: $blogId) {
      id
      title
      authorEmail
      author {
        name
      }
      content
      createdAt
      updatedAt
      published
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation AddBlog($blog: BlogInput!) {
    createBlog(blog: $blog) {
      id
      title
      author {
        name
      }
      content
      createdAt
      updatedAt
      published
    }
  }
`;
export const UPDATE_BLOG = gql`
  mutation UpdateBlog($blog: BlogInput!) {
    updateBlog(blog: $blog) {
      id
      title
      author {
        name
      }
      content
      createdAt
      updatedAt
      published
    }
  }
`;
export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: Int!) {
    deleteBlog(id: $id) 
  }
`;
