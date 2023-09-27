"use client";
import React, { useState, useEffect } from "react";
import RoomMessageInput from "./RoomMessageInput";
import socketService from "@/config/socket";
import UserInRoom from "./UserInRoom";
import { useSelector } from "react-redux";

const Room = ({ handleLeaveRoom, isSocketConnected, myRoomData }) => {
  const [messages, setMessages] = useState([]);
  const [playersKeys, setPlayersKeys] = useState([]);
  const [roomData, setRoomData] = useState({});
  const myData = useSelector((state) => {
    return state.userProfileData;
  });
  useEffect(() => {
    if (isSocketConnected) {
      socketService.socket.on("someone_joined_room", (userName) => {
        setMessages((oldMessages) => {
          const upDatedMessages = [
            ...oldMessages,
            {
              name: "none",
              messag: `${userName} joined the room`,
            },
          ];
          return upDatedMessages;
        });
      });
      socketService.socket.on("room_data_changed", (room) => {
        console.log(room);
        const arrayOfPlayersKeys = [];
        for (let key in room.members) {
          arrayOfPlayersKeys.push(key);
        }
        setPlayersKeys(arrayOfPlayersKeys);

        setRoomData(room);
      });
      socketService.socket.on("new_message_added", (message) => {
        setMessages((oldMessages) => {
          let updateMessages = [...oldMessages, message];
          return updateMessages;
        });
      });
    }
  }, [isSocketConnected]);

  const handleStartRace = () => {
    if (isSocketConnected) socketService.socket.emit("manual_start_race", {});
    console.log("startRAce");
  };
  useEffect(() => {
    const arrayOfPlayersKeys = [];
    for (let key in myRoomData.members) {
      arrayOfPlayersKeys.push(key);
    }
    setPlayersKeys(arrayOfPlayersKeys);

    setRoomData(myRoomData);
  }, [myRoomData]);

  return (
    <div className="my-4 w-full p-3">
      <div className=" text-center text-blue-400   italic text-xl">
        {roomData.roomName}
      </div>
      <div className="m-auto flex flex-col lg:flex-row w-[90%] border-[1px] min-h-[600px] bg-gray-900 text-white ">
        <div className="w-full lg:w-[30%] border-r-[1px] border-white  p-4 gap-5">
          <div className="h-[80%] ">
            <UserInRoom player={roomData?.host} isHost={true} myData={myData} />
            {playersKeys?.map((playerKey) => (
              <div key={playerKey}>
                <UserInRoom
                  player={roomData?.members[playerKey]}
                  isHost={false}
                  myData={myData}
                />
              </div>
            ))}
          </div>
          <div className="justify-around items-center gap-y-4 flex flex-wrap ">
            <button
              onClick={handleStartRace}
              className="bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              Start Race
            </button>
            <button
              onClick={handleLeaveRoom}
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:ring focus:ring-red-300"
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[70%] flex justify-between flex-col">
          <div className=" h-[50vh] overflow-y-auto bg-gray-800 p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {messages &&
              messages.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-start text-white space-x-2 "
                  >
                    <div className="bg-blue-500 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span
                        style={
                          myData.userName === item.userName
                            ? { color: "rgba(59 130 246)" }
                            : { color: "white" }
                        }
                        className="font-semibold"
                      >
                        {item.name}:
                      </span>
                      <div className="bg-gray-700 rounded-md p-2">
                        {item.message}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="h-[10%] relative">
            <RoomMessageInput
              isSocketConnected={isSocketConnected}
              roomData={roomData?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
