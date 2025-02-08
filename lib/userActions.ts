import prisma from "@/prisma/client";
import { hasAllKeys } from "@/utils/basicUtility";
import { GlobalError } from "@/utils/Exceptions";
import { User } from "@prisma/client";
import { hashPassword, verifyPassword } from "./authAction";
import { StatusCode } from "@/utils/constants";

export async function getUser(email: string, isAuthorize: boolean = false) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      password: isAuthorize,
      _count: {
        select: {
          Blog: true,
        },
      },
    },
  });
  if (!user) {
    throw new GlobalError(
      StatusCode.NOT_FOUND,
      "No User found with this Email"
    );
  }
  return user;
}

export async function createUser(user: User) {
  if (!hasAllKeys(user, ["name", "email", "password"])) {
    throw new GlobalError(StatusCode.BAD_REQUEST, "Enter All Mandatory Fields");
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(user.email)) {
    throw new GlobalError(StatusCode.BAD_REQUEST, "Enter A Valid Email");
  }
  const password = user.password;
  if (password.trim().length < 8) {
    throw new GlobalError(
      StatusCode.BAD_REQUEST,
      "Password Should be minimum 8 characters"
    );
  }
  let exisitngUser;
  try {
    const exisitngUser = await getUser(user.email);
  } catch (error) {
    console.log(error)
    if (!(error instanceof GlobalError)) {
      throw Error("Some Error Occured");
    }
  }
  if (exisitngUser) {
    throw new GlobalError(StatusCode.CONFLICT, "User Already Exists");
  }

  const hashedPassword = await hashPassword(password.trim());
  //TODO -Should catch prisma errors globally and show internal server error
  const createdUser = await prisma.user.create({
    data: { ...user, password: hashedPassword },
  });
  return createdUser;
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await getUser(email, true);
  return await verifyPassword(password, user?.password ?? "");
}
