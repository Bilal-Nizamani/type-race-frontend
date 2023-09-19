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
  let wpmObj = useRef({});

  const [serverWpm, setServerWpm] = useState(0);
  const refServerWpm = useRef(serverWpm);

  const gameData = useSelector((state) => state.gamePlayData);
  const roomPlsData = useSelector((state) => state.roomConnectedPlayersData);
  const socketSharedData = useSelector((state) => state.socketSharedData);
  const memoizedRoomPlsData = useMemo(() => roomPlsData, [roomPlsData]);

  useEffect(() => {
    for (const key in memoizedRoomPlsData) {
      if (memoizedRoomPlsData[key]?.userName === socketSharedData.userName)
        setServerWpm(memoizedRoomPlsData[key].wpm);
    }
  }, [memoizedRoomPlsData, socketSharedData.userName]);

  const {
    isRaceCompleted,
    gameEnd,
    rightText,
    wrongsLetters,
    orginalString,
    arrayOfwrittenWords,
    isCounting,
    isGameBeingPlayed,
  } = gameData;

  const [speedTestTimer, setSpeedTestTimer] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const getTimer = useCallback((seconds) => {
    setSpeedTestTimer(seconds);
  }, []);
  useEffect(() => {
    refServerWpm.current = serverWpm;
  }, [serverWpm]);
  useEffect(() => {
    if (!gameEnd) {
      wpmObj.current[speedTestTimer] = refServerWpm.current;
    }
  }, [speedTestTimer, gameEnd]);

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
      wpmObj.current = {};
    }
  }, [isCounting, dispatch]); // Added all Gthe relevant set functions as dependencies

  useEffect(() => {
    if (isRaceCompleted) {
      let totalMistakes = 0;
      if (wrongsLetters?.length > 0) {
        wrongsLetters?.forEach((item) => {
          totalMistakes += item.mistakeLetters.length;
        });
      }

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
          wpm: serverWpm,
        })
      );

      dispatch(
        addGameData({
          wpmObj: wpmObj.current,
          wpm: serverWpm,
          givenString: orginalString,
          writenString: rightText,
          typeTime: speedTestTimer,
          accuracy: accuracyPercent,
          gameType: "normal",
          mistakesArray: wrongsLetters,
        })
      );
    }
  }, [isRaceCompleted, arrayOfwrittenWords, speedTestTimer, wpmObj, orginalString, wrongsLetters, serverWpm, rightText, dispatch]);

  return (
    <>
      <GameTimer
        getTimer={getTimer}
        isGameBeingPlayed={isGameBeingPlayed}
        isRaceCompleted={isRaceCompleted}
      />
      <div className=" p-4 rounded-lg shadow-md flex justify-between items-center min-w-[500px] mb-6">
        <span className="text-lg font-bold text-blue-500">
          WPM: {serverWpm}
        </span>
        <div className="text-lg font-bold text-green-500">
          Accuracy: {accuracy}%
        </div>
      </div>
    </>
  );
});

export default Counter;
