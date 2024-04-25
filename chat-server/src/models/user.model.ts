import { model, Schema } from "mongoose";
import { user } from "../types/documents/user.document";

const userSchema = new Schema(
  {
    email: String,
  },
  { timestamps: true }
);

export const User = model<user>("User", userSchema);
