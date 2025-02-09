import { StatusCode } from "@/utils/constants";
import { GlobalError } from "@/utils/Exceptions";
import { compare, hash } from "bcryptjs";
import { getServerSession } from "next-auth";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
export async function getAuthUserEmail() {
  const session = await getServerSession();
  if (session?.user?.email) {
    return session.user.email;
  } else {
    throw new GlobalError(
      StatusCode.UNAUTHORIZED,
      "User Don't have permission for this operation"
    );
  }
}
