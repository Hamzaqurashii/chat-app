import { message } from "../types/documents/message.document";
import {
  deleteReqMessage,
  getReqMessage,
  saveReqMessage,
  updateReqMessage,
} from "../types/requests/message.request";
import { messageResponse } from "../types/responses/message.response";
import { mainMessage } from "../repositories/message.repository";
import CustomError from "../utils/error";
import {
  Get,
  Put,
  Post,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  Query,
  SuccessResponse,
} from "tsoa";

@Route("message")
@Tags("message")
export class MessageController {
  constructor() {}
  @Post("/getMessage")
  async getMessage(@Body() getReq: getReqMessage): Promise<messageResponse> {
    console.log("alkdsjflas hello", getReq);
    const Message: message | any = await new mainMessage().getMessage(getReq);
    // if (Message === null) throw new CustomError(404, "Message not found");
    return <messageResponse>Message;
  }
  @Post("/saveMessage")
  async saveMessage(@Body() saveReq: saveReqMessage): Promise<messageResponse> {
    const Message: message = await new mainMessage().saveMessage(
      <message>saveReq
    );
    return <messageResponse>Message;
  }
  @Put("/updateMessage")
  async updateMessage(
    @Body() updateReq: updateReqMessage
  ): Promise<messageResponse> {
    const Message: message | any = await new mainMessage().updateMessage(
      <message>updateReq
    );
    if (Message === null) throw new CustomError(404, "message not found");
    return <messageResponse>Message;
  }
  @Delete("/deleteMessage/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteMessage(@Path("_id") getReq: string): Promise<messageResponse> {
    const data = await new mainMessage().deleteMessage(getReq);
    return <messageResponse>data;
  }
  @Post("/getAllMessages")
  async getAllMessages(@Body() _id: string): Promise<messageResponse[]> {
    const Message: message[] = await new mainMessage().getAllMessages(_id);
    return <messageResponse[]>Message;
  }
}
