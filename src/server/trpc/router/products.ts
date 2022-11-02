import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const productRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        img: z.string(),
        description: z.string(),
        categoryId: z.string().nullish(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
          img: input.img,
          description: input.description,
          categoryId: input.categoryId,
        },
      });
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({ where: { isActive: true } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findFirst({ where: { id: input.id } });
    }),
  byname: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { name: { contains: input.name } },
      });
    }),
  byCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findMany({
        where: { category: { name: { contains: input.category } } },
      });
    }),
  category: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.update({
        data: {
          isActive: false,
        },
        where: { id: input.id },
      });
    }),
});
