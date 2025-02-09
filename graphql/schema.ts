import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { blogResolvers } from "./resolvers/blog.resolvers";
import { userResolvers } from "./resolvers/user.resolvers";
import blogSchema from "./schema/blogSchema";
import userSchema from "./schema/userSchema";

const typeDefs = mergeTypeDefs([blogSchema, userSchema]);
const resolvers = mergeResolvers([blogResolvers, userResolvers]);
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
