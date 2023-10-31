import React from "react";
import { useSelector } from "react-redux";

const ScoreBoard = ({ playedGameData }) => {
  const wrongWords = useSelector((state) => state.gamePlayData.wrongWords);

  return (
    <div className="bg-gray-900 px-6 rounded-lg shadow-lg">
      <div className="mb-4 flex justify-center items-center flex-col">
        <div className="text-lg font-semibold text-red-600 mb-2">
          Wrong Words
        </div>
        <div className="flex flex-wrap gap-x-3">
          {wrongWords.map((word, index) => (
            <div
              className="px-3 py-2 bg-red-100 text-red-600 rounded-md"
              key={index}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">WPM</span>:
          {playedGameData?.wpm}
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Race Time</span>:
          {playedGameData?.typeTime}
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Accuracy</span>:
          {playedGameData?.accuracy}%
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm shadow-white">
          <span className="text-white font-semibold">Mistakes</span>:
          {playedGameData?.totalMistakes}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
