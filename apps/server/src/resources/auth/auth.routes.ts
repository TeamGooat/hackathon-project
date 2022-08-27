import { string, z } from "zod";
import { createRouter } from "../../utils";
import { signIn, register, verify } from "./auth.services";

export const AuthRouter = createRouter()
  .mutation("login", {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      return signIn(input);
    }
  })
  .mutation("register", {
    input: z.object({
      username: z.string(),
      password: z.string(),
      email: z.string(),
      rePassword: z.string(),
      anonymous: z.boolean(),
      fName: z.string(),
      lName: z.string()
    }),
    resolve: async ({ input }) => {
      return register(input);
    }
  })
  .mutation("verify", {
    input: z.object({
      verificationCode: z.string(),
      email: z.string()
    }),
    resolve: async ({ input }) => {
      return verify(input.verificationCode, input.email);
    }
  })