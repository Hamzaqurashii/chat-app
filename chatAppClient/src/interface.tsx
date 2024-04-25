import { ReactNode } from "react";

export interface ReactChildrenProps {
  children: ReactNode;
}

export interface IAuth {
  email: string;
  isLoggedIn: boolean;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Ichat {
  sender: string;
  senderId?: string;
  text: string;
  receiver: string;
  receiverId?: string;
}

export interface IUser {
  email: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RouteParams {
  id: string;
}

export interface IRoomUser {
  user?: string;
}

export interface ITyping {
  room: string;
  user: string;
  typing: boolean;
}
export interface ICreateRoom {
  title: string;
  users: string[];
  isPrivate: boolean;
}

export interface IMessage {
  sender: {
    text: string;
    senderId: string;
  };
  _id: string;
  roomId: string;
}

export interface IJoinOrLeft {
  notificationMessage: string;
  join: string;
}

export interface IRoom {
  _id: string;
  title: string;
  users: string[];
  isPrivate: boolean;
}

export interface IAuthActions {
  type: string;
  payload: IAuth;
}

export interface IAuthContext {
  auth: IAuth;
  sign_in: (user: IAuth) => void;
  sign_out: (user: IAuth) => void;
}

export interface IAuthReducer {
  state: IAuth;
}
