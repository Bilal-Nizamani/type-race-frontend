"use client";

import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import ScoreBoard from "./ScoreBoard";
import { processArray } from "@/utils/serviceFunction";

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
      setPlayedGameData({
        ...updatedPlayedGameData,
        secondsArray: processArray(updatedPlayedGameData.secondsArray),
        wpmArray: processArray(updatedPlayedGameData.wpmArray),
      });
    }
  }, [gameData, isRaceCompleted]);

  return (
    <>
      <ScoreBoard playedGameData={playedGameData} />
      <div className=" w-full shadow-sm shadow-white p-2 rounded-md flex justify-center  mt-5 ">
        <Line
          data={{
            labels: playedGameData.secondsArray,
            datasets: [
              {
                label: "Wpm",
                data: playedGameData.wpmArray,
                cubicInterpolationMode: "default",
                borderColor: "rgba(54, 162, 235, 0.8)",
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Set your desired background color
                pointRadius: 6, // Increase the point size (adjust the value as needed)

                tension: 0.2,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false, // Hide legend
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: "rgba(54, 162, 235, 0.2)",
                },
                ticks: {
                  color: "white", // Set the color of the x-axis labels
                },
              },
              y: {
                display: true,
                grid: {
                  color: "rgba(54, 162, 235, 0.4)",
                },
                ticks: {
                  color: "white", // Set the color of the y-axis labels
                },
              },
            },
          }}
        />
      </div>
    </>
  );
});
export default MyLineChart;
