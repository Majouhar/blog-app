import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import { resolvers as blog } from "./resolvers/blog.resolvers";
import { resolvers as user } from "./resolvers/user.resolvers";

const typeDefs = mergeTypeDefs(loadFilesSync("./graphql/**/*.graphql"));
const resolvers = mergeResolvers([blog, user]);
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
