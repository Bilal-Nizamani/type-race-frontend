import React from "react";

const UserInRoom = ({ player, isHost }) => {
  return (
    <div className="flex mb-5 bg-[rgba(66,84,171,0.5)]  rounded-lg   items-center justify-center space-x-2  py-2">
      <div
        style={
          isHost ? { backgroundColor: "gray" } : { backgroundColor: "blue" }
        }
        className={`w-8 h-8 rounded-full flex items-center justify-center`}
      >
        <span className="text-white font-semibold">
          {player?.userName?.charAt(0)}
        </span>
      </div>
      <span className="text-white  text-lg">
        {player?.userName} {isHost ? "👑" : ""}
      </span>
    </div>
  );
};

export default UserInRoom;
