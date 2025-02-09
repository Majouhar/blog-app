"use client";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";

function AppoloWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default AppoloWrapper;
