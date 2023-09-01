"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Counter from "./Counter";
import CarRoad from "./CarRoad";
import RaceInput from "./RaceInput";
import MyLineChart from "./MyLineChart";
import socket from "@/config/socket";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addPlayingPlayersData } from "@/redux-store/features/roomConnectedPlayersDataSlice";
import { addGamePlayData } from "@/redux-store/features/gamePlaySlice";
import _isEqual from "lodash/isEqual";

const RaceGame = () => {
  const currentSocketSharedData = useSelector(
    (state) => state.socketSharedData,
    shallowEqual
  );
  const userShareData = useSelector((state) => state.socketSharedData);
  const previousSocketSharedDataRef = useRef(currentSocketSharedData);

  const dispatch = useDispatch();

  // race-text
  const [currText, setCurrText] = useState("");
  const [gameEnd, setGameEnd] = useState(true);
  const [isRaceCompleted, setIsRaceCompleted] = useState(false);
  // to show speed or not or reset car
  const [checkDataSend, setCheckDataSend] = useState(false);

  const [count, setCount] = useState(5);
  const [isCounting, setIsCounting] = useState(false);

  const [isGameBeingPlayed, setIsGameBeingPlayed] = useState(false);

  // Start the game countdown
  const startCounting = useCallback(() => {
    setIsCounting(true);
    setCheckDataSend(true);
    setCount(5); // Reset count to 5 when starting again
  }, []);

  // End the game
  const gameEnder = useCallback((startingGameText, checkIsGameComplete) => {
    setGameEnd(true);
    setIsGameBeingPlayed(false);
    setIsRaceCompleted(checkIsGameComplete);
    setCurrText(startingGameText);
  }, []);

  const getCurrText = useCallback((text) => {
    setCurrText(text);
  }, []);

  useEffect(() => {
    // if cheking if value is not he same when sending socket data
    if (
      (!_isEqual(
        currentSocketSharedData,
        previousSocketSharedDataRef.current
      ) &&
        checkDataSend) ||
      isCounting
    ) {
      socket.emit("player_data", currentSocketSharedData);
    }

    setCheckDataSend(isGameBeingPlayed);

    // Update the previousSocketSharedDataRef to the current value
    previousSocketSharedDataRef.current = currentSocketSharedData;
  }, [currentSocketSharedData, isGameBeingPlayed, isCounting, checkDataSend]);

  useEffect(() => {
    if (isCounting || isGameBeingPlayed) {
      socket.on("room_players_data", (playersData) => {
        const upDatedPlayers = playersData;
        // const myDataKey = Object.keys(playersData).find(
        //   (key) => playersData[key].userName === userShareData?.userName
        // );
        // if (myDataKey !== undefined) delete upDatedPlayers[myDataKey];

        dispatch(addPlayingPlayersData(upDatedPlayers));
      });
    }
  }, [isGameBeingPlayed, isCounting, dispatch, userShareData]);

  const createRoomHandler = () => {
    socket.emit("user_ready_to_play", "i am wiaint");
  };

  useEffect(() => {
    socket.on("match_found", (raceText) => {
      startCounting(true);
      setIsGameBeingPlayed(false);
      gameEnder(raceText, false);
    });

    socket.on("room_created", (roomConfirmation) => {
      setRoomCreatedMessage(roomConfirmation);
    });

    socket.on("time_up", () => {
      setGameEnd(true);
      gameEnder("Time UP", true);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [startCounting, gameEnder]);

  useEffect(() => {
    dispatch(
      addGamePlayData({
        isCounting,
        isGameBeingPlayed,
        gameEnd,
        isRaceCompleted,
      })
    );
  }, [isCounting, isGameBeingPlayed, gameEnd, isRaceCompleted, dispatch]);

  // Start the game timer
  useEffect(() => {
    if (isCounting && count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isCounting && count === 0) {
      setIsCounting(false);
      setIsGameBeingPlayed(true);
      socket.emit("game_started", {});
      setGameEnd(false);
    }
  }, [count, isCounting]);

  return (
    <>
      <div className="relative bg-gray-100 p-8 flex flex-col  2xl:w-[1300px] md:w-[500px] lg:w-[1000px] justify-center">
        <div
          className="absolute top-0 left-[45%] text-3xl font-semibold"
          id="title"
        >
          Typing Game
        </div>

        <CarRoad />
        <div
          className={`${
            count < 1 ? "hidden" : ""
          }   text-white bg-black p-5 top-[3%] left-[47%] rounded-xl w-fit absolute
     text-4xl font-bold`}
        >
          {count}
        </div>
        <div className="text-center mt-8 text-2xl">
          <div
            id="text"
            dangerouslySetInnerHTML={{ __html: currText }}
            className="mb-4"
          ></div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <RaceInput
            gameEnd={gameEnd}
            gameEnder={gameEnder}
            getCurrText={getCurrText}
          />
          <Counter />
        </div>
        <button
          className="mt-2 p-3 px-5 text-[1.5rem] mx-auto  bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onPaste={(e) => {
            e.preventDefault();
          }}
          onClick={createRoomHandler}
        >
          Play New
        </button>
        {isRaceCompleted && <MyLineChart isRaceCompleted={isRaceCompleted} />}
      </div>
    </>
  );
};

export default RaceGame;