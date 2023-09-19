"use client";
import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import { useDispatch } from "react-redux";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import socketService from "@/config/socket";

const RoomListContainer = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socketService.connect();
    socketService.onConnect(() => {
      setIsConnected(true);
      dispatch(storeConnection({ roomListConnection: true }));
    });
    if (isConnected) {
      return () => {
        socketService.socket.disconnect();
        socketService.socket = null;
        dispatch(storeConnection({ roomListConnection: false }));
      };
    }
  }, [isConnected, dispatch]);
  return <RoomList />;
};

export default RoomListContainer;
