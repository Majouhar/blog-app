import { Blog } from "@prisma/client";

export type BlogResponse = Blog & { author: { name: string } };
