import socketService from "@/config/socket";
import React, { useEffect, useState } from "react";

const RoomMessageInput = ({ isSocketConnected, roomId }) => {
  const [myMessage, setMyMessage] = useState("");

  const handleSendMessage = () => {
    if (isSocketConnected)
      socketService.socket.emit("manual_new_message", myMessage);
    setMyMessage("");
  };

  return (
    <>
      <input
        placeholder="Message"
        value={myMessage}
        onKeyPress={(e) => {
          if (e.key === "Enter" && myMessage.trim().length > 0) {
            console.log("hey");
            handleSendMessage();
          }
        }}
        onChange={(e) => {
          setMyMessage(e.target.value);
        }}
        className="w-full h-full bg-gray-700 py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none"
      />
      <button
        className="absolute top-0 right-0 h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4  focus:outline-none active:scale-[0.95] "
        onClick={handleSendMessage}
      >
        Send
      </button>
    </>
  );
};

export default RoomMessageInput;
