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
      const currDate = new Date();
      currDate.setMonth(parseInt(input.month));
      currDate.setDate(1);
      const nextMonth = new Date(currDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const posts = await prisma.post.findMany({
        where: {
          date: {
            gte: currDate,
            lt: nextMonth,
          },
        },
      });

      console.log("Posts on selected timestamp: ", posts);
      return {
        posts: posts,
      };
    }),

  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        priority: z.number(),
        date: z.date(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          priority: input.priority,
          date: input.date,
        },
      });
      return {
        post: post,
      };
    }),
});
