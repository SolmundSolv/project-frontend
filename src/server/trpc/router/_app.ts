import { router } from "../trpc";
import { authRouter } from "./auth";
import { orderRouter } from "./order";
import { productRouter } from "./products";

export const appRouter = router({
  product: productRouter,
  order: orderRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
