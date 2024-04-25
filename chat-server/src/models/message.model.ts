import { model, Schema } from "mongoose";
import { message } from "../types/documents/message.document";

const messageSchema = new Schema(
  {
    roomId: String,
    sender: { text: { type: String }, senderId: { type: String } },
  },
  { timestamps: true }
);

export const Message = model<message>("Message", messageSchema);
