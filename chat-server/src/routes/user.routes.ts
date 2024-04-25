import express from "express";
import CustomError from "../utils/error";
import { user } from "../types/documents/user.document";
import {
  deleteReqUser,
  getReqUser,
  saveReqUser,
  updateReqUser,
} from "../types/requests/user.request";
import { userResponse } from "../types/responses/user.response";
import { UserController } from "../controllers/user.controller";

class UserRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {
    this.router.post("/saveUser", async (req, res, next) => {
      try {
        const reqUser: saveReqUser = req.body;
        const User: userResponse = await new UserController().saveUser(reqUser);
        res.send(User);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateUser/:_id", async (req, res, next) => {
      try {
        const reqUser: updateReqUser = { ...req.body, _id: req.params._id };
        const User: updateReqUser = await new UserController().updateUser(
          reqUser
        );
        res.send(User);
      } catch (error) {
        next(new CustomError(404, "user id not found"));
      }
    });

    this.router.delete(
      "/deleteUser/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqUser: deleteReqUser = {
            _id: req.params._id,
          };
          const User: deleteReqUser | any =
            await new UserController().deleteUser(reqUser._id);
          res.send(User);
        } catch (error) {
          next(new CustomError(404, "user id not found"));
        }
      }
    );
    this.router.get("/getAllUsers", async (req: any, res: any, next: any) => {
      try {
        const User = await new UserController().getAllUsers();
        res.send(User);
      } catch (error) {
        next(new CustomError(404, "user id not found"));
      }
    });
  }
}

export const UserRouteApi = new UserRoute().router;
