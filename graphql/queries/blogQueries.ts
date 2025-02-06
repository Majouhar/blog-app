import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs($page: Int, $size: Int) {
    getAllPublishedBlogs(page: $page, size: $size) {
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
