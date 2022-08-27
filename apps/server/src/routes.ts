import { TRPCError } from "@trpc/server";
import { AuthRouter } from "./resources/auth";
import { JWTToken, validateTokens } from "./resources/auth/auth.services";
import { createRouter } from "./utils/trpc";

export const appRouter = createRouter()
  .merge("auth.", AuthRouter)
  .middleware(async ({ ctx, next }) => {
    const cookies = ctx.req.headers.cookie?.split(";").map(cookie => {
      const [key, value] = cookie.trim().split("=")
      return { [key]: value }
    }).reduce((p, c) => ({...p, ...c}), {})
    
    if ((await validateTokens({refreshToken: cookies!.refresh_token, accessToken: cookies!.access_token} as JWTToken)).success) return next()
    throw new TRPCError({ code: "UNAUTHORIZED" });
  })
  .query('hi', {
    resolve: () => {
      return "hello"
    }
  })
  ;

export type AppRouter = typeof appRouter;