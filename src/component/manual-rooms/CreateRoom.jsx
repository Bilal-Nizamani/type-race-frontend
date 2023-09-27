import React, { useState } from "react";
import socketService from "@/config/socket";

const CreateRoom = ({ getCreateRoomPopupDisplay, isSocketConnected }) => {
  const [roomName, setRoomName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSocketConnected)
      if (roomName.trim().length > 0) {
        socketService.socket.emit("manual_create_room", {
          roomName: roomName,
        });
        getCreateRoomPopupDisplay();
      } else {
        alert("Write Room Name");
      }
  };

  return (
    <div className="fixed inset-0  z-50 bg-black bg-opacity-50  flex items-center shadow-lg justify-center">
      <div className="relative ">
        <div
          onClick={() => {
            getCreateRoomPopupDisplay();
          }}
          className="bg-red-600  hover:bg-red-400 cursor-pointer text-white px-3 py-1 rounded-l-full rounded-b-full  absolute right-0 -top-0"
        >
          Close
        </div>
        <div className="bg-gray-800 rounded-lg p-6 w-96">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Create a Room
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="roomName"
                className="block text-gray-300 font-medium mb-2"
              >
                Room Name
              </label>
              <input
                value={roomName}
                type="text"
                id="roomName"
                name="roomName"
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
                className="w-full bg-gray-600 border rounded-md px-3 py-2 text-white placeholder-gray-400 outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter room name"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                Create Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
