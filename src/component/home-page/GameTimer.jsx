"use client";

import { useEffect, useState, memo } from "react";
import socket from "@/config/socket";

const GameTimer = memo(function GameTimer({ getTimer, isRaceCompleted }) {
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [roomTimer, setRoomTimer] = useState(0);

  useEffect(() => {
    socket.on("timer_update", (timerUpdate) => {
      setRoomTimer(timerUpdate);
    });
  }, []);

  useEffect(() => {
    if (!isRaceCompleted) {
      setTimer(10 - roomTimer);
      getTimer(10 - roomTimer);
    }
  }, [getTimer, isRaceCompleted, roomTimer]);

  return (
    <div>
      <div className="mb-4 text-gray-600">Given Time: {roomTimer} seconds</div>
      <div className="text-3xl font-bold mb-6">Timer: {timer}s</div>
    </div>
  );
});

export default GameTimer;
