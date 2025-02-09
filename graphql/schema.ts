import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { blogResolvers } from "./resolvers/blog.resolvers";
import { userResolvers } from "./resolvers/user.resolvers";
import path from "path";

const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(process.cwd(), "./graphql/**/*.graphql"))
);
const resolvers = mergeResolvers([blogResolvers, userResolvers]);
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
