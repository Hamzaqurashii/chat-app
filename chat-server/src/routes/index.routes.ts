import express from "express";

import { UserRouteApi } from "./user.routes";
import { RoomRouteApi } from "./room.routes";
import { MessageRouteApi } from "./message.routes";
export class MainRouter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.use("/user", UserRouteApi);
    this.router.use("/room", RoomRouteApi);
    this.router.use("/message", MessageRouteApi);
  }
}
export const MainApi = new MainRouter().router;
