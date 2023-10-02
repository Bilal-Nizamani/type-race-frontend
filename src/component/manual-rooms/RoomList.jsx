"use client";
import React, { useState, useEffect } from "react";
import Room from "./Room";
import CreateRoom from "./CreateRoom";
import socketService from "@/config/socket";
import ButtonList from "./ButtonList";
import { deleteRoom } from "@/utils/manualRoomsHelperFucntions";
import RaceGame from "../home-page/RaceGame";
import KickedPopup from "./KickedPopup";
const RoomList = ({ isSocketConnected }) => {
  const [isCreateRoomOpen, setCreateRoomOpen] = useState(false);
  const [allRooms, setAllRooms] = useState({});
  const [isInRoom, setIsInRoom] = useState(false);
  const [myRoomData, setMyRoomData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [kickedPopupDisplay, setKickedPoupDisplay] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleJoinRoom = (room) => {
    if (isSocketConnected) {
      socketService.socket.emit("manual_join_room", room.id);
      setMyRoomData(room);
      setIsInRoom(true);
    }
  };

  const closePopup = () => {
    setKickedPoupDisplay(false);
  };

  const getCreateRoomPopupDisplay = () => {
    setCreateRoomOpen(false);
  };

  const handleToggleCreateRoom = () => {
    setCreateRoomOpen(!isCreateRoomOpen);
  };

  const handleLeaveRoom = () => {
    if (isSocketConnected) {
      socketService.socket.emit("manual_leave_room");
    }
    setMyRoomData(null);
    setIsInRoom(false);
  };

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    // const query = event.target.value.toLowerCase();
    // setSearchQuery(query);
    //  Filter the rooms based on the search query
    // const filteredRooms = activeRooms.filter(
    //   (room) =>
    //     room.roomName.toLowerCase().includes(query) ||
    //     room.hostname.toLowerCase().includes(query)
    // );
    // setRooms(filteredRooms);
  };
  useEffect(() => {
    if (isSocketConnected && socketService.socket) {
      const socket = socketService.socket;

      socket.on(
        "get_rooms",
        ({ waitingRooms, activeRooms, roomsInCounting }) => {
          let allRoomsKeys = [
            ...Object.keys(waitingRooms),
            ...Object.keys(activeRooms),
            ...Object.keys(roomsInCounting),
          ];

          setAllRooms({
            keys: allRoomsKeys,
            rooms: {
              ...activeRooms,
              ...waitingRooms,
              ...roomsInCounting,
            },
          });
        }
      );
      socket.on("countdown_timer", (timer) => {
        setTimer(timer);
      });
      socket.on("start_game", () => {
        setIsGameStarted(true);
      });

      socket.on("room_deleted", (roomToDelete) => {
        setAllRooms((oldRooms) => {
          return deleteRoom(oldRooms, roomToDelete);
        });
      });

      socket.on("room_data_updated", (updatedRoom) => {
        setAllRooms((oldRooms) => {
          let updatedRooms = { ...oldRooms };
          updatedRooms.rooms[updatedRoom.id] = updatedRoom;
          return updatedRooms;
        });
      });
      socket.on("got_kicked", () => {
        setIsInRoom(false);
        setMyRoomData(null);
        setKickedPoupDisplay(true);
      });

      socket.on("new_room_added", (newRoom) => {
        setAllRooms((oldRooms) => {
          let updatedRooms = { ...oldRooms.rooms };
          let updatedKeys = [...oldRooms.keys];
          updatedKeys.push(newRoom.id);
          updatedRooms[newRoom.id] = newRoom;
          return { keys: updatedKeys, rooms: updatedRooms };
        });
      });
      socket.emit("get_all_rooms", {});

      socket.on("room_created", (newRoom) => {
        setMyRoomData(newRoom);
        setIsInRoom(true);
      });
      socket.on("room_joined", (joinedRoom) => {
        setMyRoomData(joinedRoom);
        setIsInRoom(true);
      });
      socket.on("time_stoped", () => {
        setTimer(0);
      });
    }
  }, [isSocketConnected]);

  return (
    <>
      {isGameStarted ? (
        <RaceGame />
      ) : (
        <div className="max-w-screen-xl mx-auto bg-gray-900 text-white min-h-screen p-4 relative">
          <h1 className="text-4xl font-semibold text-center mb-8">Room List</h1>
          {isInRoom && (
            <Room
              isSocketConnected={isSocketConnected}
              myRoomData={myRoomData}
              handleLeaveRoom={handleLeaveRoom}
              timer={timer}
            />
          )}

          {kickedPopupDisplay && <KickedPopup onClose={closePopup} />}
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
          <ButtonList />

          {isCreateRoomOpen && (
            <CreateRoom
              isSocketConnected={isSocketConnected}
              getCreateRoomPopupDisplay={getCreateRoomPopupDisplay}
            />
          )}
          <div
            className={`${
              timer < 1 ? "hidden" : ""
            }   text-white bg-black  p-5 top-[3%] left-[47%] rounded-xl w-fit absolute
     text-4xl font-bold`}
          >
            {timer}
          </div>
          {!isInRoom && (
            <button
              onClick={handleToggleCreateRoom}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-green-300 absolute top-4 right-4"
            >
              Create Room
            </button>
          )}
          <div> Total Rooms: {allRooms?.keys?.length}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {allRooms.keys?.map((roomId) => {
              return (
                <div
                  key={roomId}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition duration-300 transform hover:scale-105"
                >
                  <div>
                    <h2 className="text-xl font-semibold">
                      {allRooms.rooms[roomId]?.roomName}
                    </h2>
                    <p className="text-gray-400">
                      Host: {allRooms.rooms[roomId]?.host?.name}
                    </p>
                    <p className="text-gray-400">
                      Players:
                      {Object.keys(allRooms.rooms[roomId].members).length + 1}
                    </p>
                  </div>
                  {!isInRoom ? (
                    <button
                      onClick={() => {
                        handleJoinRoom(allRooms.rooms[roomId]);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      JOIN ROOM
                    </button>
                  ) : (
                    <button
                      className="font-semibold py-2f px-4 mt-4 rounded-lg bg-gray-300 text-gray-600  cursor-not-allowed"
                      disabled
                    >
                      Already In Room
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomList;
