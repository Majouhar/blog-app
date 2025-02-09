import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      email
      name
      blogCount
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(input: $user) {
      email
    }
  }
`;

export const VALIDATE_USER = gql`
  mutation ValidateUserCredentials($email: String!, $password: String!) {
    validateUserCredentials(email: $email, password: $password) {
      name
      email
    }
  }
`;
