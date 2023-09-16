"use client";

import { useEffect, useState, memo } from "react";
import socket from "@/config/socket";

const GameTimer = memo(function GameTimer({
  getTimer,
  isGameBeingPlayed,
  isRaceCompleted,
}) {
  const [roomTimer, setRoomTimer] = useState(200);

  useEffect(() => {
    socket.on("timer_update", (timerUpdate) => {
      setRoomTimer(timerUpdate);
    });

    socket.on("room_left", () => {
      setRoomTimer(200);
    });
  }, [getTimer]);

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
