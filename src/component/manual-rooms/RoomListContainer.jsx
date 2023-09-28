"use client";
import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import { useDispatch } from "react-redux";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import socketService from "@/config/socket";
import { addUserData } from "@/redux-store/features/userProfileSlice";
const RoomListContainer = () => {
  const dispatch = useDispatch();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  useEffect(() => {
    if (!isSocketConnected) socketService.connect(true);
    const randomNumbers = Math.floor(10000 + Math.random() * 100000); // Generates a random 5-digit number

    socketService.onConnect(() => {
      let playerData = {
        userName: "bila" + randomNumbers,
        name: "b" + randomNumbers,
        level: 1,
        averageWpm: Math.random() * 100 + 20,
      };
      dispatch(addUserData(playerData));
      socketService.socket.emit("player_info", playerData);

      setIsSocketConnected(true);
      dispatch(storeConnection({ roomListConnection: true }));
    });
    if (isSocketConnected) {
      return () => {
        socketService.socket.disconnect();
        socketService.socket = null;
        dispatch(storeConnection({ roomListConnection: false }));
      };
    }
  }, [isSocketConnected, dispatch]);
  return <RoomList isSocketConnected={isSocketConnected} />;
};

export default RoomListContainer;
