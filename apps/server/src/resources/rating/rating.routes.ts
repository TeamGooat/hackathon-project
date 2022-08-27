import { z } from "zod";
import { createRouter } from "../../utils";
import { RatingService } from "./rating.services";

const rating = new RatingService();
export const RatingRouter = createRouter()
  .mutation("new", {
    input: z.object({
      rating: z.number(),
      userId: z.string(),
    }),
    resolve: async ({ input }) => {
      return await rating.addRating(input.userId, input.rating);
    }
  })
  .mutation("all", {
    input: z.object({
      userId: z.string(),
    }),
    resolve: async ({ input }) => {
      return await rating.getRatings(input.userId);
    }
  })
  .mutation("overall", {
    input: z.object({
      userId: z.string(),
    }),
    resolve: async ({ input }) => {
      return await rating.getOverall(input.userId);
    }
  })
  ;