import { route, url } from "./endpoint";
import { ICreateRoom, IRoomUser } from "./interface";

export const getUserRequest = async (email: string) => {
  const data = await fetch(`${url}/${route.createUserReq}`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();

  return response;
};

export const getRoomRequest = async (room_users: IRoomUser[]) => {
  const data = await fetch(`${url}/${route.getRoomReq}`, {
    method: "POST",
    body: JSON.stringify(room_users),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();

  return response;
};
export const createRoomRequest = async (room_users: ICreateRoom) => {
  const data = await fetch(`${url}/${route.createRoomReq}`, {
    method: "POST",
    body: JSON.stringify(room_users),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();

  return response;
};

export const getAllMessageRequest = async (_id: string) => {
  const data = await fetch(`${url}/${route.getAllMessagesReq}`, {
    method: "POST",
    body: JSON.stringify({ _id: _id }),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();

  return response;
};
export const getRoomByIdRequest = async (_id: string) => {
  const data = await fetch(`${url}/${route.getRoomById}`, {
    method: "POST",
    body: JSON.stringify({ _id: _id }),
    headers: { "Content-Type": "application/json" },
  });
  const response = await data.json();

  return response;
};

export const getAllUsersRequest = async () => {
  const data = await fetch(`${url}/${route.getAllUserReq}`);
  const response = await data.json();

  return response;
};
export const getAllRooms = async () => {
  const data = await fetch(`${url}/${route.getAllRooms}`);
  const response = await data.json();

  return response;
};
