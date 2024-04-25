import { Document } from "mongoose";

export interface user extends Document {
  _id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
