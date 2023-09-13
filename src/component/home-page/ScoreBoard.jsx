import React from "react";

const ScoreBoard = ({ playedGameData }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">WPM</span>:{" "}
          {playedGameData?.wpm}
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Race Time</span>:{" "}
          {playedGameData?.typeTime}
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Accuracy</span>:{" "}
          {playedGameData?.accuracy}%
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Mistakes</span>:{" "}
          {playedGameData?.mistakes}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
