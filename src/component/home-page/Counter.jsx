"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addGameData } from "@/redux-store/features/gameDataSlice";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import GameTimer from "./GameTimer";

const Counter = ({
  gameEnd,
  rightText,
  arrayOfwrittenWords,
  isCounting,
  wrongsLetters,
  orginalString,
  isRaceCompleted,
  gameEnder,
}) => {
  const dispatch = useDispatch();
  const [speedTestTimer, setSpeedTestTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const givenTime = useRef(300);
  const secondsArray = useRef([]);
  const wpmArray = useRef([]);

  const calculateWpm = useCallback(() => {
    if (arrayOfwrittenWords.length - 1 < 1) return 0;
    return parseInt(
      ((arrayOfwrittenWords.length - 1) / parseInt(speedTestTimer)) * 60
    );
  }, [arrayOfwrittenWords, speedTestTimer]);

  const getTimer = (seconds) => {
    setSpeedTestTimer(seconds - givenTime.current);
  };

  // just cheking is game data cahnging

  // useEffect(() => {
  //   if (!gameEnd) {
  //     const interval = setInterval(() => {
  //       setSpeedTestTimer((prevElapsedTime) => prevElapsedTime + 1);
  //     }, 1000); // Update every 1000ms (1 second)

  //     return () => clearInterval(interval);
  //   }
  // }, [gameEnd]);

  useEffect(() => {
    if (!gameEnd) {
      const newSpeedTestTimer = speedTestTimer + 1;

      if (givenTime.current - newSpeedTestTimer < 1) gameEnder("Time up", true);
    }
  }, [speedTestTimer, gameEnd, gameEnder]); // Added setArrayOffSeonds as a dependency

  useEffect(() => {
    if (!gameEnd) {
      if (
        speedTestTimer + 1 ===
        secondsArray.current[secondsArray.current.length - 1]
      )
        return;
      if (
        (arrayOfwrittenWords.length > 0 && speedTestTimer > 0) ||
        speedTestTimer > 0
      ) {
        wpmArray.current.push(calculateWpm());
      } else wpmArray.current.push(0);
      secondsArray.current.push(speedTestTimer + 1);
    }
  }, [gameEnd, speedTestTimer, calculateWpm, arrayOfwrittenWords]);

  useEffect(() => {
    if (
      (arrayOfwrittenWords.length > 0 && speedTestTimer > 0) ||
      speedTestTimer > 0
    ) {
      setWpm(calculateWpm());
      dispatch(
        addUserShareData({
          wpm: calculateWpm(),
        })
      );
    }
  }, [arrayOfwrittenWords, speedTestTimer, calculateWpm, dispatch]);

  useEffect(() => {
    if (isCounting) {
      setSpeedTestTimer(0); // Reset the timer
      dispatch(
        addUserShareData({
          wpm: 0,
          accuracy: 0,
          place: "",
        })
      );

      setWpm(0);
      setAccuracy(0);
      secondsArray.current = [];
      wpmArray.current = [];
    }
  }, [isCounting, dispatch]); // Added all the relevant set functions as dependencies

  useEffect(() => {
    if (isRaceCompleted) {
      let totalMistakes = 0;
      wrongsLetters.forEach((item) => {
        totalMistakes += item.mistakeLetters.length;
      });
      const accuracyPercent = Math.floor(
        ((orginalString.length - totalMistakes) / orginalString.length) * 100
      );
      setAccuracy(accuracyPercent);

      dispatch(
        addUserShareData({
          wpm: wpm,
          accuracy: accuracyPercent,
          finishingTime: speedTestTimer,
          place: 1,
        })
      );

      dispatch(
        addGameData({
          wpmArray: wpmArray.current,
          wpm: wpm,
          givenString: orginalString,
          writenString: rightText,
          secondsArray: secondsArray.current,
          typeTime: speedTestTimer,
          accuracy: accuracyPercent,
          gameType: "normal",
          mistakesArray: wrongsLetters,
          place: "1/4",
        })
      );
    }
  }, [
    isRaceCompleted,
    arrayOfwrittenWords,
    speedTestTimer,
    orginalString,
    wrongsLetters,
    secondsArray,
    wpm,
    rightText,
    dispatch,
  ]); // Added dispatch as a dependency

  return (
    <>
      <GameTimer getTimer={getTimer} />
      <div className="mb-4 text-gray-600">
        Given Time: {givenTime.current - parseInt(speedTestTimer)} seconds
      </div>
      <div className="text-3xl font-bold mb-6">Timer: {speedTestTimer}s</div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center min-w-[500px] mb-6">
        <span className="text-lg font-semibold text-blue-500">WPM: {wpm}</span>
        <div className="text-lg text-green-500">Accuracy: {accuracy}%</div>
      </div>
    </>
  );
};

export default Counter;
