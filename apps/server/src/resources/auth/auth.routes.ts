import { string, z } from "zod";
import { createRouter } from "../../utils";
import { signIn, register, verifyUser, validateTokens } from "./auth.services";

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
  .mutation("verifyUser", {
    input: z.object({
      verificationCode: z.string(),
      email: z.string()
    }),
    resolve: async ({ input }) => {
      return verifyUser(input.verificationCode, input.email);
    }
  })
  .mutation("validateTokens", {
    input: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    }),
    resolve: async ( {input} ) => {
      return validateTokens(input)
    }
  })