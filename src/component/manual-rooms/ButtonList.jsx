import React, { useState } from "react";

const ButtonList = () => {
  const buttons = [
    "All Rooms",
    "Room In Game",
    "Room In Counting",
    "Waiting Room",
    "Full Rooms",
    "Locked Room",
  ];
  const [activeButtons, setActiveButtons] = useState("All Rooms");

  const handleButtonClick = (button) => {
    setActiveButtons(button);

    // You can add your logic here to handle button click (e.g., filtering rooms based on the selected buttons)
  };

  return (
    <div className="flex flex-wrap mt-4 justify-center gap-2">
      {buttons.map((button) => (
        <button
          key={button}
          className={`px-4 py-2 text-white transition-all duration-300 border border-gray-300 rounded cursor-pointer ${
            activeButtons === button
              ? "bg-blue-500 translate-y-1 scale-105  "
              : "bg-gray-900 "
          }`}
          style={
            activeButtons === button
              ? { boxShadow: " 0px 6px 12px rgba(0, 0, 0, 0.2) " }
              : {}
          }
          onClick={() => handleButtonClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
