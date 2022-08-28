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
  .query("single", {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({input}) => {
      return await questionService.getSingleQuestion(input.id);
    }
  })
  .query("answered", {
    resolve: async () => {
      return await questionService.getAnswered();
    }
  })
  .mutation("new", {
    input: z.object({
      title: z.string(),
      question: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const id: string = ctx.res.getHeader("user-id") as string;
      return questionService.newQuestion(id, input.title, input.question);
    }
  })
  .mutation("answer", {
    input: z.object({
      questionId: z.string(),
      answer: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      const id: string = ctx.res.getHeader("user-id") as string;
      return questionService.answerQuestion(id, input.answer, input.questionId);
    }
  })
  ;