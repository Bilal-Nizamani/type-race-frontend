// components/KickedPopup.js

import React from "react";

function KickedPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-gray-800 flex flex-col   p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">You are kicked!</h2>
        <p className="text-gray-200">You have been removed from the game.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default KickedPopup;
