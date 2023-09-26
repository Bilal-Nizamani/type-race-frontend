"use client";
import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import { useDispatch } from "react-redux";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import socketService from "@/config/socket";

const RoomListContainer = () => {
  const dispatch = useDispatch();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  useEffect(() => {
    if (!isSocketConnected) socketService.connect(true);
    socketService.onConnect(() => {
      socketService.socket.emit("player_info", {
        userName: "bila" + Math.random(),
        name: "Bilal Nizamani",
        lever: 1,
        averageWpm: Math.random() * 100 + 20,
      });
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
