"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Counter from "./Counter";
import CarRoad from "./CarRoad";
import RaceInput from "./RaceInput";
import MyLineChart from "./MyLineChart";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addPlayingPlayersData } from "@/redux-store/features/roomConnectedPlayersDataSlice";
import { addGamePlayData } from "@/redux-store/features/gamePlaySlice";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import _isEqual from "lodash/isEqual";
import AllRoomPlayersScoreBoard from "./AllRoomPlayersScoreBoard";
import socketService from "@/config/socket";

// gameMode cane be
// 'single-player', 'manual-room', 'auto-room'
const RaceGame = ({ gameMode, handleLeaveRoom }) => {
  const currentSocketSharedData = useSelector(
    (state) => state.socketSharedData,
    shallowEqual
  );
  const isSocketConnected = useSelector(
    (state) => state.socketConnection.connection
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
    if (isSocketConnected) {
      try {
        if (
          isWaiting ||
          isCounting ||
          isGameBeingPlayed ||
          roomGameState === "started"
        ) {
          socketService.socket.emit("leave_room", " leave the room");
        } else {
          socketService.socket.emit("user_ready_to_play", "i am want");
        }
        setIsRaceCompleted(false);
        setRoomGameState("started");
        changeDatatoDefault();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Connection Problem");
    }
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
      isSocketConnected &&
        socketService.socket.emit("player_data", currentSocketSharedData);
    }

    setCheckDataSend(isGameBeingPlayed);

    // Update the previousSocketSharedDataRef to the current value
    previousSocketSharedDataRef.current = currentSocketSharedData;
  }, [
    currentSocketSharedData,
    isSocketConnected,
    isGameBeingPlayed,
    isCounting,
    checkDataSend,
  ]);

  useEffect(() => {
    if (!isSocketConnected || (!isCounting && !isGameBeingPlayed)) {
      return; // If not connected or not counting and not in-game, exit early
    }

    const handleRoomPlayersData = (playersData) => {
      const updatedPlayers = playersData;
      dispatch(addPlayingPlayersData(updatedPlayers));
    };

    socketService.socket.on("room_players_data", handleRoomPlayersData);

    return () => {
      // Cleanup the event listener when the component unmounts
      socketService.socket.off("room_players_data", handleRoomPlayersData);
    };
  }, [
    isGameBeingPlayed,
    isCounting,
    dispatch,
    userShareData,
    isSocketConnected,
  ]);

  useEffect(() => {
    const gameCompletedOrTimerEnded = () => {
      setGameEnd(true);
      gameEnder("Time UP", true);
      setIsGameBeingPlayed(false);
      setIsRaceCompleted(true);
      setRoomGameState("ended");
    };

    const matchFoundHandler = (raceText) => {
      setIsGameBeingPlayed(false);
      gameEnder(raceText, false);
      setIsCounting(true);
      setIsWaiting(false);
    };

    const roomLeftHandler = () => {
      setIsWaiting(false);
      setGameEnd(true);
      setIsCounting(false);
      setIsGameBeingPlayed(false);
      setCount(0);
      setIsRaceCompleted(false);
      setCurrText("");
      changeDatatoDefault();
      setRoomGameState("not-started");
    };

    const lefAloneInTheRoomHandler = () => {
      setCount(0);
      setCheckDataSend(true);
      changeDatatoDefault();
      setIsWaiting(true);
    };

    const countingCompletedHandler = (socket) => {
      setIsCounting(false);
      setIsGameBeingPlayed(true);
      socket.emit("game_started", {});
      setGameEnd(false);
      setCount(0);
    };

    const countDownTimerHandler = (countTimer) => {
      setCount(countTimer);
      setCheckDataSend(true);
    };
    if (isSocketConnected) {
      const socket = socketService.socket;
      socket.on("counting_completed", () => {
        countingCompletedHandler(socket);
      });

      if (gameMode === "auto-room") {
        socket.on("countdown_timer", countDownTimerHandler);

        socket.on("match_found", matchFoundHandler);
        socket.on("room_left", roomLeftHandler);
        socket.on("room_created", (roomConfirmation) => {
          setRoomCreatedMessage(roomConfirmation);
        });
        socket.on("time_up", () => {
          gameCompletedOrTimerEnded();
        });
        socket.on("waiting", () => {
          setIsWaiting(true);
        });
        socket.on("game_completed", () => {
          gameCompletedOrTimerEnded();
        });
        socket.on("left_alone", lefAloneInTheRoomHandler);
      }
    }
  }, [gameEnder, isSocketConnected]);

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
      <div className="max-w-screen-xl mx-auto bg-gray-900 text-white min-h-screen p-4 relative">
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
          <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.7)] text-white rounded-xl p-4 shadow-md  text-2xl font-bold">
            <div>Waiting for players....</div>
            {/* Add any additional content or buttons here */}
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
            isSocketConnected={isSocketConnected}
          />
          <Counter isSocketConnected={isSocketConnected} />
        </div>
        {gameMode === "manual-room" ? (
          <>
            <button
              className="mt-2 p-3 px-5 text-[1.5rem] w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleLeaveRoom}
            >
              Leave Game
            </button>
          </>
        ) : (
          <button
            className="mt-2 p-3 px-5 text-[1.5rem] w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
        )}
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
