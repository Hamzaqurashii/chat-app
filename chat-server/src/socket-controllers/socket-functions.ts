import { getMessage } from "./messages";

export const getChat = async (socket: any) => {
  socket.on("chat message", async (msg: any) => {
    const message = await getMessage(msg);

    socket.to(msg.roomId).emit("receive_message", message);
  });
};

export const getNotification = async (socket: any) => {
  socket.on("notification", (data: any) => {
    console.log(data, "ssss");
    socket.to(data.room).emit("User Joined", {
      notificationMessage: data.notificationMessage,
      join: data.join,
    });
  });
};

export const getStopTyping = async (socket: any) => {
  socket.on("stopTyping", (roomName: any) => {
    // Broadcast to other users in the same room that this user stopped typing
    console.log(roomName);
    socket.to(roomName.room).emit("userStoppedTyping");
  });
};
export const getTyping = async (socket: any) => {
  socket.on("typing", (data: any) => {
    console.log(data);
    // Broadcast to other users in the same room that this user is typing
    socket
      .to(data.room)
      .emit("userTyping", { user: data.user, typing: data.typing });
  });
};
export const getJoinRoom = async (socket: any) => {
  socket.on("join room", async (roomID: any) => {
    await socket.join(roomID);
  });
};
export const getDisconnected = async (socket: any) => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};
