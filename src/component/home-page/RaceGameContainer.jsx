"use client";
import React, { useEffect, useState } from "react";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import { useDispatch } from "react-redux";
import socketService from "@/config/socket";
import RaceGame from "./RaceGame";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";

const RaceGameContainer = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const randomNumbers = Math.floor(10000 + Math.random() * 100000); // Generates a random 5-digit number
    const userName = "guest" + randomNumbers;
    const car = Math.floor(Math.random() * 5) + 1;
    dispatch(addUserShareData({ userName: userName, car: car }));
  }, [dispatch]);

  useEffect(() => {
    socketService.connect();

    socketService.onConnect(() => {
      setIsConnected(true);
      dispatch(storeConnection({ autoRoomConnection: true }));
    });

    return () => {
      socketService.socket.disconnect();
      socketService.socket = null;
      dispatch(storeConnection({ autoRoomConnection: false }));
    };
  }, [isConnected, dispatch]);
  return <RaceGame />;
};

export default RaceGameContainer;
