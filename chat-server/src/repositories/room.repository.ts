import { room } from "../types/documents/room.document";
import { Room } from "../models/room.model";
import { roomResponse } from "../types/responses/room.response";
import mongoose from "mongoose";

import { getRoomById } from "../types/requests/room.request";

export class mainRoom {
  constructor() {}
  getRoom = async (data: any) => {
    const privateRoom = await Room.findOne({
      $and: [
        {
          users: new mongoose.Types.ObjectId(data[0].user),
        },
        {
          users: new mongoose.Types.ObjectId(data[1].user),
        },
      ],
    }).exec();

    console.log(privateRoom, "privateRoom");

    if (!privateRoom) {
      const createPrivateRoom = await new Room({
        isPrivate: true,
        users: [data[0].user, data[1].user],
      }).save();

      console.log(createPrivateRoom, "createdRoom")
      return createPrivateRoom;
    }

    return privateRoom;
  };
  saveRoom = async (room: room) => {
    return new Room({
      users: [room.senderId, room.receiverId],
    }).save();
  };
  saveGroupRoom = async (room: room) => {
    return new Room(room).save();
  };
  updateRoom = async (room: room) => {
    return Room.findByIdAndUpdate(room._id, room, { new: true });
  };
  deleteRoom = async (_id: string) => {
    return Room.findByIdAndDelete(_id);
  };
  getRoomById = async (_id: any) => {
    return Room.findById(_id);
  };
  getAllRooms = async () => {
    return Room.find({ isPrivate: false });
  };
}
