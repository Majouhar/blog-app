// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import schema from "@/graphql/schema";
import {  createYoga } from "graphql-yoga";

interface NextContext {
  params: Promise<Record<string, string>>;
}

const { handleRequest } = createYoga<NextContext>({
  schema: schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
  maskedErrors: process.env.NODE_ENV !== "development",
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
