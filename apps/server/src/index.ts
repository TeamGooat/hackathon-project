import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve('.env') });
import express, { Express } from "express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from "./routes";
import { createContext } from "./utils";
import { createServer, Server } from "http";
import { Server as SocketServer } from "socket.io";
<<<<<<< HEAD
<<<<<<< HEAD
import cors from 'cors'
=======
>>>>>>> 11f8fae (✨ feat(socket): basic webrtc)
=======
import cors from 'cors'
>>>>>>> fae659c (	modified:   .env)

const app: Express = express();
const httpServer: Server = createServer(app);
const io: SocketServer = new SocketServer(httpServer);

const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use(cors({
  credentials: true,
  origin: '*'
}))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

io.on('connection', (socket) => {
  console.log('a user connected');

<<<<<<< HEAD
<<<<<<< HEAD
  socket.on("sdp", (sdp) => {
    socket.broadcast.emit("sdp", sdp);
  })

  socket.on("ice", (ice) => {
=======
  socket.on("sdp", (sdp: RTCSessionDescriptionInit) => {
    socket.broadcast.emit("sdp", sdp);
  })

  socket.on("ice", (ice: RTCIceCandidate) => {
>>>>>>> 11f8fae (✨ feat(socket): basic webrtc)
=======
  socket.on("sdp", (sdp) => {
    socket.broadcast.emit("sdp", sdp);
  })

  socket.on("ice", (ice) => {
>>>>>>> fae659c (	modified:   .env)
    socket.broadcast.emit("ice", ice);
  })
});

httpServer.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
