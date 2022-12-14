import { z } from "zod";
import { createRouter } from "../../utils";
import { createTokens } from "../../utils/jwt";
import { AuthService } from "./auth.services";


const authService = new AuthService()
export const AuthRouter = createRouter()
  .mutation("login", {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    resolve: async ({input, ctx}) => {
      const res = await authService.signIn(input);
      if (res.success) {
        const { accessToken, refreshToken } = createTokens({
          user_id: res.user_id,
          email: res.email,
          username: res.username,
          first_name: res.first_name,
          last_name: res.last_name,
        })
        ctx.res.cookie("access_token", accessToken, { httpOnly: true, path: "/" });
        ctx.res.cookie("refresh_token", refreshToken, { httpOnly: true, path: "/" });
        return {
          success: true,
          user_id: res.user_id,
        }
      } else {
        return {
          success: false,
          error: res.error,
        }
      }
    }
  })
  .mutation("register", {
    input: z.object({
      first_name: z.string(),
      last_name: z.string(),
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    resolve: async ({ input }) => {
      return authService.signUp(input);
    }
  })
  .mutation("verify", {
    input: z.object({
      otp: z.string(),
    }),
    resolve: async ({ input }) => {
      return authService.verifyOTP(input.otp);
    }
  })