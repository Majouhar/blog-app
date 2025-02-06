import {
  getUser,
  createUser,
  validateUserCredentials,
} from "@/lib/userActions";
import { User } from "@prisma/client";

export const resolvers = {
  Query: {
    async getUser(_: any, { email }: { email: string }) {
      const user = await getUser(email);
      return {
        name: user.name,
        email: user.email,
        blogCount: user._count.Blog,
      };
    },
  },

  Mutation: {
    async createUser(
      _: any,
      { input }: { input: { name: string; email: string; password: string } }
    ) {
      const user = await createUser(input as User);
      return {
        name: user.name,
        email: user.email,
      };
    },

    async validateUserCredentials(
      _: any,
      { email, password }: { email: string; password: string }
    ) {
      const isValid = await validateUserCredentials(email, password);
      return isValid;
    },
  },

  User: {
    blogCount: (parent: any) => parent.blogCount ?? 0,
  },
};
