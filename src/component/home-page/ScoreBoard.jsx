import React from "react";

const ScoreBoard = ({ playedGameData }) => {
  return (
    <div className=" bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">WPM</span>:{" "}
          {playedGameData?.wpm}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Given Text</span>:{" "}
          {playedGameData?.givenString}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Written Text</span>:{" "}
          {playedGameData?.writenString}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Race Time</span>:{" "}
          {playedGameData?.typeTime}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Given Time</span>:{" "}
          {playedGameData?.givenTime}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Accuracy</span>:{" "}
          {playedGameData?.accuracy}%
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Game Type</span>:{" "}
          {playedGameData?.gameType}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Mistakes</span>:{" "}
          {playedGameData?.mistakes}
        </div>
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-lg shadow">
          <span className="text-white font-semibold">Place</span>:{" "}
          {playedGameData?.place}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
