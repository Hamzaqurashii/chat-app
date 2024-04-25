import { message } from "../types/documents/message.document";
import { Message } from "../models/message.model";
import { messageResponse } from "../types/responses/message.response";
import mongoose from "mongoose";

export class mainMessage {
  constructor() {}
  getMessage = async (data: any) => {
    return await Message.findOne({
      $and: [
        {
          users: new mongoose.Types.ObjectId(data[0].user),
        },
        {
          users: new mongoose.Types.ObjectId(data[1].user),
        },
      ],
    }).exec();
  };
  saveMessage = async (message: message) => {
    return new Message(message).save();
  };
  updateMessage = async (message: message) => {
    return Message.findByIdAndUpdate(message._id, message, { new: true });
  };
  deleteMessage = async (_id: string) => {
    return Message.findByIdAndDelete(_id);
  };
  getAllMessages = async (_id: string) => {
    return Message.find({ roomId: _id }).limit(20).sort({ createdAt: -1 });
  };
}
