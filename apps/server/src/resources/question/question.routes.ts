import { z } from "zod";
import { createRouter } from "../../utils";
import { GetQuestions, NewQuestion } from "./question.services";

export const QuestionRouter = createRouter()
  .mutation("new", {
    input: z.object({
      question: z.string(),
      user_id: z.number(),
    }),
    resolve: async ({ input }) => {
      return NewQuestion(input.user_id, input.question);
    }
  })
  .query("all", {
    resolve: async ({ input }) => {
      return GetQuestions();
    }
  })
  ;