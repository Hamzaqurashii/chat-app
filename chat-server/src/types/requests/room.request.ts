import { Schema } from "mongoose";

export interface saveReqRoom {
  users: any[];
  isPrivate: boolean;
  title: string;
}
export interface updateReqRoom {
  _id: string;
  users: any[];
  title?: string;
  isPrivate: boolean,
}

export interface deleteReqRoom {
  _id: string;
}
export interface getRoomById {
  _id: string;
}
export interface getReqRoom {
  users: any[];
}
