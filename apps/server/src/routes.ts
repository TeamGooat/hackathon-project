import { TRPCError } from "@trpc/server";
import { AuthRouter } from "./resources/auth";
import { UserPayload } from "./resources/auth/auth.types";
import { QuestionRouter } from "./resources/question/question.routes";
import { createTokens, verifyToken } from "./utils/jwt";
import { createRouter } from "./utils/trpc";

export const appRouter = createRouter()
  .merge("auth.", AuthRouter)
  .middleware(async ({ ctx, next }) => {
    const cookies = ctx.req.headers.cookie?.split(";").map(cookie => {
      const [key, value] = cookie.trim().split("=")
      return { [key]: value }
    }).reduce((p, c) => ({...p, ...c}), {})

    const { accessToken, refreshToken } = { accessToken: cookies?.access_token, refreshToken: cookies?.refresh_token }
    if (accessToken && refreshToken) {
      const valid = verifyToken(accessToken)
      if (valid.success) {
        const newTokens = createTokens({
          user_id: (valid.decoded as UserPayload).user_id,
          email: (valid.decoded as UserPayload).email,
          username: (valid.decoded as UserPayload).username,
          first_name: (valid.decoded as UserPayload).first_name,
          last_name: (valid.decoded as UserPayload).last_name,
        })
        ctx.res.cookie("access_token", newTokens.accessToken, { httpOnly: true, path: "/" });
        ctx.res.cookie("refresh_token", newTokens.refreshToken, { httpOnly: true, path: "/" });
        ctx.res.setHeader("user-id", (valid.decoded as UserPayload).user_id);
        return next();
      } else {
        const rValid = verifyToken(refreshToken)
        if (rValid.success) {
          const newTokens = createTokens({
            user_id: (rValid.decoded as UserPayload).user_id,
            email: (rValid.decoded as UserPayload).email,
            username: (rValid.decoded as UserPayload).username,
            first_name: (rValid.decoded as UserPayload).first_name,
            last_name: (rValid.decoded as UserPayload).last_name,
          })
          ctx.res.cookie("access_token", newTokens.accessToken, { httpOnly: true, path: "/" });
          ctx.res.cookie("refresh_token", newTokens.refreshToken, { httpOnly: true, path: "/" });
          return next()
        } else {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
      }
    } else {
      ctx.res.clearCookie("access_token");
      ctx.res.clearCookie("refresh_token");
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  })
  .query("echo", {
    resolve: async ({ ctx }) => {
      return {
        message: "hello",
      };
    }
  })
  .merge("question.", QuestionRouter)
  ;

export type AppRouter = typeof appRouter;