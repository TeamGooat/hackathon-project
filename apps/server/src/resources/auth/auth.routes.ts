import { z } from "zod";
import { createRouter } from "../../utils";
import { signIn } from "./auth.services";

export const AuthRouter = createRouter()
  .mutation("login", {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      return signIn(input);
    }
  });