import express from "express";
import CustomError from "../utils/error";
import { message } from "../types/documents/message.document";
import {
  deleteReqMessage,
  getReqMessage,
  saveReqMessage,
  updateReqMessage,
} from "../types/requests/message.request";
import { messageResponse } from "../types/responses/message.response";
import { MessageController } from "../controllers/message.controller";

class MessageRoute {
  router: express.Router;
  constructor() {
    this.router = express.Router();
    this.route();
  }
  route() {

    this.router.post("/saveMessage", async (req, res, next) => {
      try {
        const reqMessage: saveReqMessage = req.body;
        const Message: messageResponse =
          await new MessageController().saveMessage(reqMessage);
        res.send(Message);
      } catch (error) {
        console.log(error);
      }
    });
    this.router.post("/getMessage", async (req, res, next) => {
      try {
        const reqMessage: getReqMessage = req.body;
        const Message: messageResponse =
          await new MessageController().getMessage(reqMessage);
        res.send(Message);
      } catch (error) {
        console.log(error);
      }
    });

    this.router.put("/updateMessage/:_id", async (req, res, next) => {
      try {
        const reqMessage: updateReqMessage = {
          ...req.body,
          _id: req.params._id,
        };
        const Message: updateReqMessage =
          await new MessageController().updateMessage(reqMessage);
        res.send(Message);
      } catch (error) {
        next(new CustomError(404, "message id not found"));
      }
    });

    this.router.delete(
      "/deleteMessage/:_id",
      async (req: any, res: any, next: any) => {
        try {
          const reqMessage: deleteReqMessage = {
            _id: req.params._id,
          };
          const Message: deleteReqMessage | any =
            await new MessageController().deleteMessage(reqMessage._id);
          res.send(Message);
        } catch (error) {
          next(new CustomError(404, "message id not found"));
        }
      }
    );
    this.router.post(
      "/getAllMessages",
      async (req: any, res: any, next: any) => {
        try {
          const _id: string = req.body;
          const Message = await new MessageController().getAllMessages(_id);
          res.send(Message);
        } catch (error) {
          next(new CustomError(404, "message id not found"));
        }
      }
    );
  }
}

export const MessageRouteApi = new MessageRoute().router;
