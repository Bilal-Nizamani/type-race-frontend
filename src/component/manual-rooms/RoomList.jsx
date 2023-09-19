"use client";
import React, { useState, useEffect } from "react";
import Room from "./Room";
import CreateRoom from "./CreateRoom";
import socketService from "@/config/socket";

const RoomList = () => {
  const initialRooms = [
    { hostname: "John Doe", roomName: "Intermediate Typing Challenge" },
    { hostname: "Alice Smith", roomName: "Expert Typing Showdown" },
    { hostname: "Emily Johnson", roomName: "Pro Typing Championship" },
    { hostname: "Michael Wilson", roomName: "Advanced Typist Gathering" },
    { hostname: "Sophia Brown", roomName: "Typing Masters Meetup" },
    { hostname: "William Lee", roomName: "Typing Enthusiasts Club" },
    { hostname: "Olivia Davis", roomName: "Speed Typing Contest" },
    { hostname: "James Miller", roomName: "Keyboard Warriors Lounge" },
    { hostname: "Emma Wilson", roomName: "Fast Fingers Fiesta" },
    { hostname: "Liam Davis", roomName: "Type and Learn Social" },
    { hostname: "Charlotte Harris", roomName: "Typing Champions Arena" },
    { hostname: "Lucas White", roomName: "WPM Challenge Extravaganza" },
    { hostname: "Ava Taylor", roomName: "Keyboard Kings and Queens" },
    { hostname: "Mason Martin", roomName: "Type Like a Pro Room" },
    { hostname: "Amelia Anderson", roomName: "Typing Titans Hall" },
    { hostname: "Henry Jackson", roomName: "Word Wizards Club" },
    { hostname: "Ella Turner", roomName: "Quick Fingers Society" },
    { hostname: "Benjamin Clark", roomName: "Swift Typist Hangout" },
    { hostname: "Grace Lewis", roomName: "Master Keyers Guild" },
    { hostname: "Alexander Walker", roomName: "Typing Stars Lounge" },
  ];
  const [isCreateRoomOpen, setCreateRoomOpen] = useState(false);
  const [rooms, setRooms] = useState(initialRooms);
  const [isInRoom, setIsInRoom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleJoinRoom = () => {
    setIsInRoom(true);
  };

  const getCreateRoomPopupDisplay = () => {
    setCreateRoomOpen(false);
  };

  const handleToggleCreateRoom = () => {
    setCreateRoomOpen(!isCreateRoomOpen);
  };

  const handleLeaveRoom = () => {
    setIsInRoom(false);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the rooms based on the search query
    const filteredRooms = initialRooms.filter(
      (room) =>
        room.roomName.toLowerCase().includes(query) ||
        room.hostname.toLowerCase().includes(query)
    );
    setRooms(filteredRooms);
  };

  useEffect(() => {
    socketService.connect("room-list");
    return () => {
      socketService?.socket?.disconnect();
      socketService.socket = null;

      console.log("disconeted roomlist");
    };
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto bg-gray-900 text-white min-h-screen p-4 relative">
      <h1 className="text-4xl font-semibold text-center mb-8">Room List</h1>
      {isInRoom && <Room handleLeaveRoom={handleLeaveRoom} />}
      <div className="w-full max-w-lg mx-auto relative">
        <div className="relative">
          <input
            placeholder="Search Room"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-full bg-gray-800 rounded-md py-3 px-4 pr-10 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <span className="absolute top-0 right-0 h-full flex items-center pr-3 text-gray-400 cursor-pointer">
            SEARCH
          </span>
        </div>
      </div>
      {isCreateRoomOpen && (
        <CreateRoom getCreateRoomPopupDisplay={getCreateRoomPopupDisplay} />
      )}
      {!isInRoom && (
        <button
          onClick={handleToggleCreateRoom}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-green-300 absolute top-4 right-4"
        >
          Create Room
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            <div>
              <h2 className="text-xl font-semibold">{room.roomName}</h2>
              <p className="text-gray-400">Host: {room.hostname}</p>
            </div>
            <button
              onClick={handleJoinRoom}
              disabled={isInRoom}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              JOIN ROOM
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
