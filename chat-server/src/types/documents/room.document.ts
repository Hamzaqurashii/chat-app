import { Document, Schema } from "mongoose";

export interface room extends Document {
  _id: string;
  users: any[];
  senderId: string;
  title?: string;
  receiverId: string;
  isPrivate: boolean,
  createdAt?: string;
  updatedAt?: string;
}
