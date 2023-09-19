"use client";

import React, { useEffect, useState } from "react";
import socketService from "@/config/socket";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { useDispatch } from "react-redux";
import RaceGame from "@/component/home-page/RaceGame";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";

const typeRace = () => {
  const dispatch = useDispatch();
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    const userName = "guest" + randomNumbers;
    const car = Math.floor(Math.random() * 5) + 1;
    dispatch(addUserShareData({ userName: userName, car: car }));
  }, [dispatch]);

  useEffect(() => {
    socketService.connect();

    socketService.onConnect(() => {
      setConnected(true);
      dispatch(storeConnection({ autoRoom: true }));
    });
    if (isConnected) {
      return () => {
        socketService.socket.disconnect();
        socketService.socket = null;
        dispatch(storeConnection({ autoRoom: false }));
      };
    }
  }, [isConnected, dispatch]);
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <RaceGame />
      </main>
      <Footer />
    </div>
  );
};

export default typeRace;
