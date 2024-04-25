import express from "express";
import CustomError from "../utils/error";
import { room } from "../types/documents/room.document";
import {
  deleteReqRoom,
  getReqRoom,
  getRoomById,
  saveReqRoom,
  updateReqRoom,
} from "../types/requests/room.request";
import { roomResponse } from "../types/responses/room.response";
import { RoomController } from "../controllers/room.controller";

class RoomRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    this.router.post("/saveRoom", async (req, res, next) => {
      try {
        const reqRoom: saveReqRoom = req.body;
        const Room: roomResponse = await new RoomController().saveRoom(reqRoom);
        res.send(Room);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/saveGroupRoom", async (req, res, next) => {
      try {
        const reqRoom: saveReqRoom = req.body;
        const Room: roomResponse = await new RoomController().saveGroupRoom(reqRoom);
        res.send(Room);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/getRoom", async (req, res, next) => {
      try {
        const reqRoom: getReqRoom = req.body;
        const Room: roomResponse = await new RoomController().getRoom(reqRoom);
        res.send(Room);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/getRoomById", async (req, res, next) => {
      try {
        const reqRoom: getRoomById = req.body;
        const Room: roomResponse = await new RoomController().getRoomById(reqRoom);
        res.send(Room);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateRoom/:_id", async (req, res, next) => {
      try {
        const reqRoom: updateReqRoom = { ...req.body, _id: req.params._id };
        const Room: updateReqRoom = await new RoomController().updateRoom(
          reqRoom
        );
        res.send(Room);
      } catch (error) {
        next(new CustomError(404, "room id not found"));
      }
    });

    this.router.delete(
      "/deleteRoom/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqRoom: deleteReqRoom = {
            _id: req.params._id,
          };
          const Room: deleteReqRoom | any =
            await new RoomController().deleteRoom(reqRoom._id);
          res.send(Room);
        } catch (error) {
          next(new CustomError(404, "room id not found"));
        }
      }
    );
    this.router.get("/getAllRooms", async (req: any, res: any, next: any) => {
      try {
        const Room = await new RoomController().getAllRooms();
        res.send(Room);
      } catch (error) {
        next(new CustomError(404, "room id not found"));
      }
    });
  }
}

export const RoomRouteApi = new RoomRoute().router;
