import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('.env') });
import express, { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./routes";
import { createContext } from "./utils";
import { Server as SocketServer } from "socket.io";
import cors from 'cors'

const app: Express = express();

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(cors({
  credentials: true,
  origin: [`${process.env.FURL}`]
}))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);



const server = app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

const io: SocketServer = new SocketServer(server, {
  cors: {
    origin: process.env.FURL
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("sdp", (sdp) => {
    socket.broadcast.emit("sdp", sdp);
  })

  socket.on("ice", (ice) => {
    socket.broadcast.emit("ice", ice);
  })

  socket.on("code:input", (code: string) => {
    socket.broadcast.emit("code:input", code);
  })

  socket.on("changemode", (mode) => {
    socket.broadcast.emit("changemode", mode);
  })

  socket.on("math:input", (input: { [key: number]: string }) => {
    socket.broadcast.emit("math:input", input);
  })

  socket.on("math:line", (input: number) => {
    socket.broadcast.emit("math:line", input);
  })
});