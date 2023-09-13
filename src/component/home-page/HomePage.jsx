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
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import _isEqual from "lodash/isEqual";
import AllRoomPlayersScoreBoard from "./AllRoomPlayersScoreBoard";

const RaceGame = () => {
  const currentSocketSharedData = useSelector(
    (state) => state.socketSharedData,
    shallowEqual
  );
  const userShareData = useSelector((state) => state.socketSharedData);
  const previousSocketSharedDataRef = useRef(currentSocketSharedData);
  const [isWaiting, setIsWaiting] = useState(false);
  const dispatch = useDispatch();

  // race-text
  const [currText, setCurrText] = useState("");
  const [gameEnd, setGameEnd] = useState(true);
  const [isRaceCompleted, setIsRaceCompleted] = useState(false);
  const [roomGameState, setRoomGameState] = useState("not-started");
  // to show speed or not or reset car
  const [checkDataSend, setCheckDataSend] = useState(false);

  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const [isGameBeingPlayed, setIsGameBeingPlayed] = useState(false);

  // End the game
  const gameEnder = useCallback((startingGameText, checkIsGameComplete) => {
    setGameEnd(true);
    setIsGameBeingPlayed(false);
    setIsRaceCompleted(checkIsGameComplete);
    setCurrText(startingGameText);
  }, []);
  const changeDatatoDefault = () => {
    dispatch(addPlayingPlayersData({}));
    dispatch(
      addUserShareData({
        accuracy: 0,
        finishingTime: "",
        carPosition: 0,
        arrayOfwrittenWords: "",
        isRaceCompleted: false,
      })
    );
  };

  const getCurrText = useCallback((text) => {
    setCurrText(text);
  }, []);

  const createRoomHandler = () => {
    if (
      isWaiting ||
      isCounting ||
      isGameBeingPlayed ||
      roomGameState === "started"
    ) {
      socket.emit("leave_room", " leave the room");
    } else {
      socket.emit("user_ready_to_play", "i am want");
    }
    setIsRaceCompleted(false);
    setRoomGameState("started");
    changeDatatoDefault();
  };

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
        dispatch(addPlayingPlayersData(upDatedPlayers));
      });
    }
  }, [isGameBeingPlayed, isCounting, dispatch, userShareData]);

  useEffect(() => {
    socket.on("match_found", (raceText) => {
      setIsGameBeingPlayed(false);
      gameEnder(raceText, false);
      setIsCounting(true);
      setIsWaiting(false);
    });
    socket.on("room_left", () => {
      setIsWaiting(false);
      setGameEnd(true);
      setIsCounting(false);
      setIsGameBeingPlayed(false);
      setCount(0);
      setIsRaceCompleted(false);
      setCurrText("");
      changeDatatoDefault();
      setRoomGameState("not-started");
    });

    socket.on("room_created", (roomConfirmation) => {
      setRoomCreatedMessage(roomConfirmation);
    });

    socket.on("time_up", () => {
      setGameEnd(true);
      gameEnder("Time UP", true);
      setIsGameBeingPlayed(false);
      setIsRaceCompleted(true);
      setRoomGameState("ended");
    });

    socket.on("waiting", () => {
      setIsWaiting(true);
    });

    socket.on("game_completed", () => {
      setGameEnd(true);
      gameEnder("Race Ended", true);
      setIsGameBeingPlayed(false);
      setIsRaceCompleted(true);
      setRoomGameState("ended");
    });
    socket.on("left_alone", () => {
      setCount(0);
      setCheckDataSend(true);
      changeDatatoDefault();
      setIsWaiting(true);
    });

    socket.on("countdown_timer", (countTimer) => {
      setCount(countTimer);
      setCheckDataSend(true);
    });

    socket.on("counting_completed", () => {
      setIsCounting(false);
      setIsGameBeingPlayed(true);
      socket.emit("game_started", {});
      setGameEnd(false);
      setCount(0);
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [gameEnder]);

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

  return (
    <>
      <div className="relative bg-gray-900 text-white p-8 flex flex-col  2xl:w-[1300px] md:w-[700px] lg:w-[1000px] justify-center">
        <div
          className="  text-3xl text-center -mt-5 mb-3 font-semibold"
          id="title"
        >
          Typing Game
        </div>

        <CarRoad />
        <div
          className={`${
            count < 1 ? "hidden" : ""
          }   text-white bg-black  p-5 top-[3%] left-[47%] rounded-xl w-fit absolute
     text-4xl font-bold`}
        >
          {count}
        </div>
        {isWaiting ? (
          <div
            className="text-white bg-gray-800 shadow-md shadow-white p-5 top-[7%] left-[35%] rounded-xl w-fit absolute
     text-2xl font-bold"
          >
            Waiting for players....
          </div>
        ) : (
          ""
        )}
        <div className="text-center mt-8 text-3xl">
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
            isGameBeingPlayed={isGameBeingPlayed}
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
          {isWaiting ||
          isCounting ||
          isGameBeingPlayed ||
          roomGameState === "started"
            ? "Leave Game"
            : "Play New"}
        </button>
        {roomGameState === "ended" && (
          <AllRoomPlayersScoreBoard
            isGameBeingPlayed={isGameBeingPlayed}
            isRaceCompleted={isRaceCompleted}
          />
        )}
        {isRaceCompleted && <MyLineChart isRaceCompleted={isRaceCompleted} />}
      </div>
    </>
  );
};

export default RaceGame;
