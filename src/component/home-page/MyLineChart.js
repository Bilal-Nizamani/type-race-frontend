'use client'

import React, { useEffect, useRef, useState, memo  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    Tooltip,
  );


// const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
// const datapoints1 = [0, 40, 50, 20, 30, 70, 50, 120, 165, 155, 120, 120];
// const datapoints2 = [0, 60, 20, 60, 20, 110, 134, 111, 144, 124, 150, 150];


const MyLineChart = memo(function MyLineChart({isRaceCompleted}) {

  const gameData = useSelector(state => state.gameData)

  // const labels = useRef([])
  // const wpmArray = useRef([])

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
        gameType: 'normal',
        mistakes: gameData.wrongsLetters,
        place: '1/4',
      };
      setPlayedGameData(updatedPlayedGameData);
    }
  }, [gameData, isRaceCompleted]);

    return (
      <>      

      <ScoreBoard playedGameData={playedGameData}/>
      <div className=' w-full  flex justify-center shadow-xl mt-5 ' >
      <Line
      
          data={{
            labels:playedGameData.secondsArray,
            datasets: [
    {
      label: 'Wpm',
      data: playedGameData.wpmArray,
      fill: false,
      cubicInterpolationMode: 'default',
      borderColor: 'rgba(54, 162, 235, 0.8)',
      tension: 0.2
    }, 
            ],
          }}
        />
      </div>      </>

    );
  });
  export default MyLineChart;