"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGameData } from "@/redux-store/features/gameDataSlice";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import GameTimer from "./GameTimer";

const Counter = memo(function Counter() {
  const dispatch = useDispatch();
  const [serverWpm, setServerWpm] = useState(0);

  const gameData = useSelector((state) => state.gamePlayData);
  const roomPlsData = useSelector((state) => state.roomConnectedPlayersData);
  const userName = useSelector((state) => state.socketSharedData.userName);
  const memoizedRoomPlsData = useMemo(() => roomPlsData, [roomPlsData]);

  useEffect(() => {
    for (const key in memoizedRoomPlsData) {
      if (memoizedRoomPlsData[key]?.userName === userName)
        setServerWpm(memoizedRoomPlsData[key].wpm);
    }
  }, [memoizedRoomPlsData, userName]);

  const {
    isRaceCompleted,
    gameEnd,
    rightText,
    wrongsLetters,
    orginalString,
    arrayOfwrittenWords,
    isCounting,
  } = gameData;
  const [speedTestTimer, setSpeedTestTimer] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const secondsArray = useRef([]);

  const wpmArray = useRef([]);

  // const calculateWpm = useCallback(() => {
  //   if (arrayOfwrittenWords.length - 1 < 1) return 0;

  //   return parseInt(
  //     (arrayOfwrittenWords.length / parseInt(speedTestTimer)) * 60
  //   );
  // }, [arrayOfwrittenWords, speedTestTimer]);

  const getTimer = useCallback((seconds) => {
    setSpeedTestTimer(seconds);
  }, []);

  useEffect(() => {
    if (!gameEnd) {
      secondsArray.current.push(speedTestTimer + 1);
      wpmArray.current.push(serverWpm);
    }
  }, [gameEnd, speedTestTimer, serverWpm]); // removed calculate wpm

  // useEffect(() => {
  //   wpmArray.current.push(serverWpm);
  // }, [serverWpm]);

  useEffect(() => {
    dispatch(
      addUserShareData({
        arrayOfwrittenWords: arrayOfwrittenWords,
      })
    );
  }, [arrayOfwrittenWords, speedTestTimer, dispatch]); //calculateWpm,

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

      setAccuracy(0);
      secondsArray.current = [];
      wpmArray.current = [];
    }
  }, [isCounting, dispatch]); // Added all Gthe relevant set functions as dependencies

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
          accuracy: accuracyPercent,
          finishingTime: speedTestTimer,
          place: 1,
          isRaceCompleted: isRaceCompleted,
          arrayOfwrittenWords: arrayOfwrittenWords,
        })
      );

      dispatch(
        addGameData({
          wpmArray: wpmArray.current,
          wpm: serverWpm,
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
    serverWpm,
    rightText,
    // calculateWpm,
    dispatch,
  ]); // Added dispatch as a dependency

  return (
    <>
      <GameTimer getTimer={getTimer} isRaceCompleted={isRaceCompleted} />

      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center min-w-[500px] mb-6">
        <span className="text-lg font-semibold text-blue-500">
          WPM: {serverWpm}
        </span>
        <div className="text-lg text-green-500">Accuracy: {accuracy}%</div>
      </div>
    </>
  );
});

export default Counter;
