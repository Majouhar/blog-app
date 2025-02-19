const userSchema = `
type Query {
  getUser(email: String!): User
}

type Mutation {
  createUser(input: CreateUserInput!): User
  validateUserCredentials(email: String!, password: String!): User
}

type User {
  name: String!
  email: String!
  blogCount: Int!
}

input CreateUserInput {
  name: String!
  email: String!
  password: String!
}



`;
export default userSchema;
