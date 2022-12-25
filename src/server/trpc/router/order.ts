import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const orderRouter = router({
  create: publicProcedure
    .input(
      z.object({
        contractor: z.string(),
        number: z.number(),
        price: z.number(),
        status: z.string(),
        products: z.string().array(),
      })
    )
    .mutation(({ ctx, input }) => {
      const connect: { id: string }[] = [];
      input.products.map((e) => {
        connect.push({ id: e });
      });

      return ctx.prisma.order.create({
        data: {
          number: input.number,
          contractorId: input.contractor,
          statusId: input.status,
          price: input.price,
          products: {
            connect,
          },
        },
      });
    }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany();
  }),
});
