"use client";

import { useEffect, useState } from "react";
import socket from "@/config/socket";

const GameTimer = ({ getTimer }) => {
  const [timer, setTimer] = useState(0); // Timer in seconds

  useEffect(() => {
    socket.on("timer_update", (timerUpdate) => {
      setTimer(timerUpdate);
      getTimer(timerUpdate);
    });
  }, [getTimer]);

  return (
    <div>
      <h1>Timer: {timer} seconds</h1>
    </div>
  );
};

export default GameTimer;
