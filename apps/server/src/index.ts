import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log(process.env.JWT_SECRET)
import express from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./routes";
import { createContext } from "./utils";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
