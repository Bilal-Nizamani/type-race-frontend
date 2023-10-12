"use client";
import React, { useState, useEffect } from "react";
import RoomList from "./RoomList";
import { useDispatch } from "react-redux";
import { storeConnection } from "@/redux-store/features/socketConnetionSlice";
import socketService from "@/config/socket";
import { useSelector } from "react-redux";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";

const RoomListContainer = () => {
  const dispatch = useDispatch();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const myData = useSelector((state) => state.userProfileData);
  const { car, userName } = useSelector((state) => state.userProfileData);

  useEffect(() => {
    try {
      if (!isSocketConnected) socketService.connect(true);

      socketService.onConnect(() => {
        socketService.socket.emit("player_info", myData);

        setIsSocketConnected(true);
        dispatch(storeConnection({ connection: true, type: "manual-room" }));
      });
      if (isSocketConnected) {
        return () => {
          socketService.socket.disconnect();
          socketService.socket = null;
          dispatch(storeConnection({ connection: false }));
        };
      }
    } catch (err) {
      console.log(err);
    }
  }, [isSocketConnected, dispatch, myData]);
  useEffect(() => {
    if (isSocketConnected) dispatch(addUserShareData({ car, userName }));
  }, [isSocketConnected, car, userName, dispatch]);
  return <RoomList isSocketConnected={isSocketConnected} />;
};

export default RoomListContainer;
