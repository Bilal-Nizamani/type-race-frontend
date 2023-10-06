"use client";
import React, { useEffect, useState } from "react";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import { useDispatch, useSelector } from "react-redux";
import socketService from "@/config/socket";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import RaceGame from "./RaceGame";

const RaceGameContainer = () => {
  const dispatch = useDispatch();
  const { car, userName } = useSelector((state) => state.userProfileData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      socketService.connect(false);
    }
    socketService.onConnect(() => {
      setIsConnected(true);
      dispatch(storeConnection({ connection: true }));
    });

    if (isConnected) {
      return () => {
        socketService.socket.disconnect();
        socketService.socket = null;
        dispatch(storeConnection({ connection: false }));
      };
    }
  }, [isConnected, dispatch]);
  useEffect(() => {
    if (isConnected) dispatch(addUserShareData({ car, userName }));
  }, [isConnected, car, userName, dispatch]);
  return <RaceGame gameMode="auto-room" />;
};

export default RaceGameContainer;
