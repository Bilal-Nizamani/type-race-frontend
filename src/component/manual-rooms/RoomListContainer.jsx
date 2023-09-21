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
    if (!isSocketConnected) socketService.connect("roomlist");
    socketService.onConnect(() => {
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
