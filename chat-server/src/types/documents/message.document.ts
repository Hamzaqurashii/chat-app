import { Document, Schema } from "mongoose";

export interface message extends Document {
  _id: string;
  roomId: string;
  sender: { text: string; senderId: string };
  isPrivate: boolean;
  createdAt?: string;
  updatedAt?: string;
}
