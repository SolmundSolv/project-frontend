import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
// import bcrypt from "bcrypt";
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  // signUp: protectedProcedure
  //   .input(
  //     z.object({
  //       name: z.string(),
  //       email: z.string().email(),
  //       password: z.string(),
  //     })
  //   )
  //   .mutation(({ ctx, input }) => {
  //     const pass = bcrypt.hashSync(input.password, 10);
  //     return ctx.prisma.user.create({
  //       data: {
  //         name: input.name,
  //         email: input.email,
  //         password: pass,
  //       },
  //     });
  //   }),
});
