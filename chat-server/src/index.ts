import startServer from "./app";
import { getMessage } from "./socket-controllers/messages";
import {
  getChat,
  getDisconnected,
  getJoinRoom,
  getNotification,
  getStopTyping,
  getTyping,
} from "./socket-controllers/socket-functions";

export const { io, server } = startServer();

io.on("connection", (socket) => {
  getChat(socket);

  getJoinRoom(socket);

  getTyping(socket);

  getNotification(socket);

  getStopTyping(socket);

  getDisconnected(socket);
});
