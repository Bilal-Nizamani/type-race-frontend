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
        wpmObj: gameData.wpmObj,
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
      let secondAndWpmArrays = processArray(updatedPlayedGameData.wpmObj);

      console.log(updatedPlayedGameData.wpmObj);
      setPlayedGameData({
        ...updatedPlayedGameData,
        ...secondAndWpmArrays,
      });
    }
  }, [gameData, isRaceCompleted]);

  return (
    <>
      <ScoreBoard playedGameData={gameData} />
      <div className=" w-full shadow-sm shadow-white p-2 rounded-md flex justify-center  mt-5 ">
        <Line
          data={{
            labels: playedGameData.secondsArray, // X-axis labels
            datasets: [
              {
                label: "Wpm", // Label for the dataset
                data: playedGameData.wpmArray, // Data points for the Y-axis
                cubicInterpolationMode: "default",
                borderColor: "rgba(54, 162, 235, 0.8)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointRadius: 6,
                tension: 0.2,
              },
            ],
          }}
          options={{
            responsive: true, // Make the chart responsive
            maintainAspectRatio: false, // Allow stretching
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
            scales: {
              x: {
                display: true,
                grid: {
                  color: "rgba(54, 162, 235, 0.2)",
                },
                ticks: {
                  color: "white",
                },
              },
              y: {
                display: true,
                grid: {
                  color: "rgba(54, 162, 235, 0.4)",
                },
                ticks: {
                  color: "white",
                },
              },
            },
          }}
          height={400} // Specify a fixed height for the chart container
        />
      </div>
    </>
  );
});
export default MyLineChart;
