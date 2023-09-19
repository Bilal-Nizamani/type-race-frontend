"use client";

import { useEffect, useState, memo } from "react";
import socketService from "@/config/socket";
import { useSelector } from "react-redux";

const GameTimer = memo(function GameTimer({
  getTimer,
  isGameBeingPlayed,
  isRaceCompleted,
}) {
  const [roomTimer, setRoomTimer] = useState(200);
  const isSocketConnected = useSelector(
    (state) => state.socketConnection.autoRoomConnection
  );

  useEffect(() => {
    if (isSocketConnected) {
      socketService.socket.on("timer_update", (timerUpdate) => {
        setRoomTimer(timerUpdate);
      });

      socketService.socket &&
        socketService.socket.on("room_left", () => {
          setRoomTimer(200);
        });
    }
  }, [getTimer, isSocketConnected]);

  useEffect(() => {
    if (!isRaceCompleted) {
      getTimer(200 - roomTimer);
    }
  }, [getTimer, isRaceCompleted, roomTimer]);

  return (
    <div className="flex justify-between">
      <div
        style={{
          color: roomTimer < 10 && isGameBeingPlayed ? "red" : "gray",
        }}
        className="text-2xl  mb-6"
      >
        {roomTimer}
      </div>
    </div>
  );
});

export default GameTimer;
