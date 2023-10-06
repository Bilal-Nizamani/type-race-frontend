"use client";
import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import { useDispatch } from "react-redux";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import socketService from "@/config/socket";
import { useSelector } from "react-redux";
const RoomListContainer = () => {
  const dispatch = useDispatch();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const myData = useSelector((state) => state.userProfileData);
  useEffect(() => {
    if (!isSocketConnected) socketService.connect(true);

    socketService.onConnect(() => {
      socketService.socket.emit("player_info", myData);

      setIsSocketConnected(true);
      dispatch(storeConnection({ connection: true }));
    });
    if (isSocketConnected) {
      return () => {
        socketService.socket.disconnect();
        socketService.socket = null;
        dispatch(storeConnection({ connection: false }));
      };
    }
  }, [isSocketConnected, dispatch, myData]);
  return <RoomList isSocketConnected={isSocketConnected} />;
};

export default RoomListContainer;
