"use client";

import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "./ScoreBoard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const MyLineChart = memo(function MyLineChart({ isRaceCompleted }) {
  const gameData = useSelector((state) => state.gameData);

  const [playedGameData, setPlayedGameData] = useState({});

  useEffect(() => {
    if (isRaceCompleted && gameData) {
      const updatedPlayedGameData = {
        wpmArray: gameData.wpmArray,
        secondsArray: gameData.secondsArray,
        wpm: gameData.wpm,
        givenString: gameData.orginalString,
        writenString: gameData.rightText,
        typeTime: gameData.speedTestTimer,
        givenTime: gameData.givenTime,
        accuracy: gameData.accuracyPercent,
        gameType: "normal",
        mistakes: gameData.wrongsLetters,
        place: "1/4",
      };
      setPlayedGameData(updatedPlayedGameData);
    }
  }, [gameData, isRaceCompleted]);

  return (
    <>
      <ScoreBoard playedGameData={playedGameData} />
      <div className=" w-full  flex justify-center shadow-xl mt-5 ">
        <Line
          data={{
            labels: playedGameData.secondsArray,
            datasets: [
              {
                label: "Wpm",
                data: playedGameData.wpmArray,
                fill: false,
                cubicInterpolationMode: "default",
                borderColor: "rgba(54, 162, 235, 0.8)",
                tension: 0.2,
              },
            ],
          }}
        />
      </div>
    </>
  );
});
export default MyLineChart;
