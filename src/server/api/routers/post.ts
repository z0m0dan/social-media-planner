import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getMontlyPosts: publicProcedure
    .input(z.object({ month: z.string() }))
    .query(async ({ input }) => {
      const posts = await prisma.post.findMany({
        where: {
          createdAt: {
            gte: new Date(input.month),
            lt: new Date(input.month),
          },
        },
      });

      return {
        posts: posts,
      };
    }),
});
