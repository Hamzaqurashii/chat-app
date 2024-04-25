import { Link } from "react-router-dom";
import { createRoomRequest, getAllRooms } from "../request";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth-store";
import { ICreateRoom, IRoom } from "../interface";



export default function GroupList() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const [bool, setBool] = useState(false);

  const { auth } = useContext(AuthContext);

  const getAllRoomReq = async () => {
    const data = await getAllRooms();
    setRooms(data);
  };

  const createRoomReq = async () => {
    const room: ICreateRoom = {
      title: newRoom,
      users: [auth._id ?? ""],
      isPrivate: false,
    };
    createRoomRequest(room)
    setBool(!bool);
  };

  useEffect(() => {
    getAllRoomReq();
  }, [bool]);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <div className="flex gap-2">
        <input
          className="border border-black rounded-md placeholder:text-sm"
          placeholder="create new room"
          onChange={(e) => {
            setNewRoom(e.target.value);
          }}
        />
        <button
          onClick={() => {
            createRoomReq();
          }}
          className="rounded text-white text-[10px] bg-blue-600 px-2 py-1"
        >
          Create
        </button>
      </div>

      {rooms.map((room) => (
        <Link to={`/room/${room._id}`} key={room._id}>
          <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">

              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {room.title}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{room._id}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
