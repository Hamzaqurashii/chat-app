import React, { useContext, useEffect, useRef, useState } from "react";
import { IJoinOrLeft, IMessage, RouteParams } from "../../interface";
import io from "socket.io-client";
import { url } from "../../endpoint";
import AuthContext from "../../auth-store";
import { Link, useNavigation, useParams } from "react-router-dom";
import { getAllMessageRequest, getRoomByIdRequest } from "../../request";

function GroupChatBox() {
  const { id } = useParams<keyof RouteParams>() as RouteParams;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const newMessage = useRef<HTMLInputElement>(null);
  const [room, setRoom] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [whoIsTyping, setWhoIstyping] = useState<string | null>(null);
  const [isRoom, setIsRoom] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigation = useNavigation();

  const socket = io(url);

  const { auth } = useContext(AuthContext);

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();

    const message = {
      roomId: room,
      sender: { text: newMessage.current?.value ?? "", senderId: auth._id },
    };

    socket.emit("chat message", {
      message: message,
      roomId: room,
    });

    if (newMessage.current) newMessage.current.value = "";
  };

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    const room = await getRoomByIdRequest(id);
    setRoom(room._id);

    localStorage.setItem("room", JSON.stringify(room._id));
    socket.emit("notification", {
      notificationMessage: `${auth._id} has joined the room`,
      room: room._id,
      join: "success",
    });
  };

  useEffect(() => {
    const handleLeavePage = () => {
      socket.emit("notification", {
        notificationMessage: `${auth._id} has left the room`,
        room: JSON.parse(localStorage.getItem("room") ?? ""),
        join: "error",
      });
    };

    return () => {
      if (window.location.pathname.includes(id ?? "") === false) {
        handleLeavePage();
      }
    };
  }, [navigation]);

  const getMsg = async () => {
    const getMessages = await getAllMessageRequest(room ?? "");
    setMessages(getMessages.reverse());
  };

  useEffect(() => {
    if (room) {
      if (isRoom === false) {
        getMsg();
        setIsRoom(true);
      }

      socket.emit("join room", room);

      socket.on("receive_message", (message: IMessage[]) => {
        setMessages(message.reverse());
      });

      socket.on("userTyping", (msg: any) => {
        setWhoIstyping(msg.user);
      });

      socket.on("User Joined", (data: IJoinOrLeft) => {
        setNotificationMessage(data.notificationMessage);
        setType(data.join);
        setIsVisible(true);
        if (data.join === "error") {
          localStorage.setItem("room", JSON.stringify(null));
        }
      });

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      // socket.on("userStoppedTyping", () => {
      //   setWhoIstyping(null);
      // });

      return () => {
        socket.off("userTyping");
        socket.off("User Joined");
        socket.disconnect();
        clearTimeout(timer);
      };
    }
  }, [socket, room]);
  let typingTimer: any;

  const handleTyping = (event: any) => {
    clearTimeout(typingTimer);
    if (event.target.value !== "") {
      if (!isTyping) {
        socket.emit("typing", { room, user: auth._id, typing: true });
        setIsTyping(true);
      }
      typingTimer = setTimeout(() => {
        socket.emit("typing", { room, user: null, typing: false });
        setIsTyping(false);
      }, 1000); // Adjust the duration as needed
    } else {
      socket.emit("typing", { room, user: null, typing: false });
      setIsTyping(false);
    }
  };

  const handleChange = (event: any) => {
    handleTyping(event);
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimer);
    };
  }, [isTyping]);

  return (
    <div className="h-screen">
      {isVisible && (
        <div
          className={`${
            type === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          } px-4 py-3 rounded relative`}
          role="alert"
        >
          <strong className="font-bold">
            {type === "success" ? "Success!" : "Error!"}
          </strong>
          <span className="block sm:inline"> {notificationMessage}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setIsVisible(false)}
          >
            <svg
              className="fill-current h-6 w-6"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-3.535-3.536-3.536 3.536a1 1 0 1 1-1.414-1.414l3.536-3.535-3.536-3.536a1 1 0 1 1 1.414-1.414l3.536 3.536 3.535-3.536a1 1 0 1 1 1.414 1.414l-3.536 3.536 3.536 3.535z" />
            </svg>
          </button>
        </div>
      )}

      <div className="h-[80%] flex flex-col bg-white shadow-md border-black border rounded-md">
        <div className={`flex-1 p-4 overflow-y-auto flex flex-col`}>
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={`text-sm justify-end ${
                  message.sender.senderId === auth._id
                    ? "text-end"
                    : "text-start"
                }`}
              >
                {message.sender.senderId === auth._id ? (
                  <p className="text-gray-600">
                    {message.sender.text} : {message.sender.senderId}
                  </p>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <Link
                      to={`/chat/${message.sender.senderId}`}
                      className="bg-green-500 text-white text-[8px] px-2 py-1 rounded-md"
                    >
                      Send Message
                    </Link>
                    <p className="text-gray-600 ">
                      {message.sender.senderId}: {message.sender.text}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {whoIsTyping && whoIsTyping !== auth._id && (
            <p className="text-[8px] text-end">{whoIsTyping ?? ""} is typing</p>
          )}
        </div>
        <form className="p-4" onSubmit={handleSendMessage}>
          <input
            type="text"
            // value={newMessage}
            id="input-field"
            onChange={(event) => {
              handleChange(event);
            }}
            ref={newMessage}
            // onFocus={() => {
            //   socket.emit("typing", { room, user: auth._id });
            // }}
            // onBlur={() => {
            //   socket.emit("stopTyping", { room });
            // }}
            className="w-full p-2 pl-10 border border-black mb-2 text-sm text-gray-700"
            placeholder="Type a message..."
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupChatBox;
