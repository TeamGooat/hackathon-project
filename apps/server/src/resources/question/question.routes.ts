import { z } from "zod";
import { createRouter } from "../../utils";
import { QuestionService } from "./question.services";

const questionService = new QuestionService();
export const QuestionRouter = createRouter()
  .query("all", {
    resolve: async () => {
      return await questionService.getQuestions();
    }
  })
  .mutation("new", {
    input: z.object({
      question: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const id: string = ctx.res.getHeader("user-id") as string;
      return questionService.newQuestion(id, input.question);
    }
  })
  ;