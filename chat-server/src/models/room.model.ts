import { model, Schema } from "mongoose";
import { room } from "../types/documents/room.document";

const roomSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isPrivate: { type: Boolean, default: true },
    title: String,
  },
  { timestamps: true }
);

export const Room = model<room>("Room", roomSchema);
