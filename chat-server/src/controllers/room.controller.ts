import { room } from "../types/documents/room.document";
import {
  deleteReqRoom,
  getReqRoom,
  getRoomById,
  saveReqRoom,
  updateReqRoom,
} from "../types/requests/room.request";
import { roomResponse } from "../types/responses/room.response";
import { mainRoom } from "../repositories/room.repository";
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

@Route("room")
@Tags("room")
export class RoomController {
  constructor() {}
  @Post("/getRoom")
  async getRoom(@Body() getReq: getReqRoom): Promise<roomResponse> {
    const Room: room | any = await new mainRoom().getRoom(getReq);
    // if (Room === null) throw new CustomError(404, "Room not found");
    return <roomResponse>Room;
  }
  @Post("/saveRoom")
  async saveRoom(@Body() saveReq: saveReqRoom): Promise<roomResponse> {
    const Room: room = await new mainRoom().saveRoom(<room>saveReq);
    return <roomResponse>Room;
  }
  @Post("/saveGroupRoom")
  async saveGroupRoom(@Body() saveReq: saveReqRoom): Promise<roomResponse> {
    const Room: room = await new mainRoom().saveGroupRoom(<room>saveReq);
    return <roomResponse>Room;
  }
  @Post("/getRoomById")
  async getRoomById(@Body() saveReq: getRoomById): Promise<roomResponse> {
    const Room: room | any = await new mainRoom().getRoomById(saveReq);
    return <roomResponse>Room;
  }
  @Put("/updateRoom")
  async updateRoom(@Body() updateReq: updateReqRoom): Promise<roomResponse> {
    const Room: room | any = await new mainRoom().updateRoom(<room>updateReq);
    if (Room === null) throw new CustomError(404, "room not found");
    return <roomResponse>Room;
  }
  @Delete("/deleteRoom/{_id}")
  @SuccessResponse("200", "data deleted")
  async deleteRoom(@Path("_id") getReq: string): Promise<roomResponse> {
    const data = await new mainRoom().deleteRoom(getReq);
    return <roomResponse>data;
  }
  @Get("/getAllRooms")
  async getAllRooms(): Promise<roomResponse[]> {
    const Room: room[] = await new mainRoom().getAllRooms();
    return <roomResponse[]>Room;
  }
}
