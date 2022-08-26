import { AuthRouter } from "./resources/auth";
import { createRouter } from "./utils/trpc";

export const appRouter = createRouter()
  .merge("auth.", AuthRouter)
  ;

export type AppRouter = typeof appRouter;