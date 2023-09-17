"use client";
import React from "react";

const Room = ({ handleLeaveRoom }) => {
  const players = [
    "bilal",
    "ehtsham",
    "hira",
    "abdullah",
    "hamza",
    "qavi",
    "samad",
    "mateen",
  ];
  const messages = [
    {
      name: "Bilal",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Ehtsam",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Mateen",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Khabeer",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Shahzeb",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Amman",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Qavi",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Khabeer",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Shahzeb",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Amman",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
    {
      name: "Qavi",
      message:
        "In this Next 13 tutorial series, you'll learn the basics of Next.js to make a simple project, using the new app router & server components.",
    },
  ];
  const handleSendMessage = () => {};

  return (
    <div className="my-4 w-full p-3">
      <div className="m-auto flex flex-col lg:flex-row w-[90%] border-[1px] min-h-[600px] bg-gray-900 text-white ">
        <div className="w-full lg:w-[30%] border-r-[1px] border-white  p-4 gap-5">
          <div className="h-[80%] overflow-y-auto">
            {players.map((player, index) => (
              <div key={index} className="flex items-center space-x-2 py-2">
                <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {player.charAt(0)}
                  </span>
                </div>
                <span className="text-white text-lg">{player}</span>
              </div>
            ))}
          </div>
          <div className="justify-around items-center gap-y-4 flex flex-wrap ">
            <button className="bg-blue-500 hover:bg-blue-600 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">
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
          <div className="h-[90%] max-h-[600px] overflow-y-scroll bg-gray-800 p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {messages.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-2 text-white"
              >
                <div className="bg-blue-500 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <span className="font-semibold">{item.name}:</span>
                  <div className="bg-gray-700 rounded-md p-2">
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[10%] relative">
            <input
              placeholder="Message"
              //   value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full h-full bg-gray-700 py-3 px-4 text-white text-lg placeholder-gray-400 focus:outline-none"
            />
            <button
              className="absolute top-0 right-0 h-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4  focus:outline-none active:scale-[0.95] "
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
