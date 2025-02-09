import { validateUserCredentials } from "@/lib/userActions";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      //@ts-expect-error expected-error
      async authorize(credentials) {
        const user: { name: string; email: string } =
          await validateUserCredentials(
            credentials?.email ?? "",
            credentials?.password ?? ""
          );

        return {
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 7 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
