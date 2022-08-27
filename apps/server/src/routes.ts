import { AuthRouter } from "./resources/auth";
import { QuestionRouter } from "./resources/question/question.routes";
import { createRouter } from "./utils/trpc";

export const appRouter = createRouter()
  .merge("auth.", AuthRouter)
  .merge("question.", QuestionRouter)
  ;

export type AppRouter = typeof appRouter;