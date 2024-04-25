import { Schema } from "mongoose";

export interface saveReqMessage {
  roomId: string;
  sender: { text: string; senderId: string };
  isPrivate: boolean;
}
export interface updateReqMessage {
  _id: string;
  roomId: string;
  sender: { text: string; senderId: string };
  isPrivate: boolean;
}

export interface deleteReqMessage {
  _id: string;
}
export interface getReqMessage {
  users: any[];
}
