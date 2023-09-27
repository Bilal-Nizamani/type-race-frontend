import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

const UserInRoom = ({ player, isHost, myData }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const openUser = (thePlayer) => {
    setIsContextMenuOpen((old) => {
      return !old;
    });
  };
  return (
    <div
      onClick={() => {
        openUser(player);
      }}
      className={`flex mb-5 cursor-pointer relative hover:bg-[rgba(66,84,171,0.5)] bg-[rgba(66,84,171,0.2)]  ${
        isContextMenuOpen ? "rounded-t-lg" : "rounded-lg"
      }  items-center justify-center space-x-2  py-2`}
    >
      <div
        style={
          isHost ? { backgroundColor: "gray" } : { backgroundColor: "blue" }
        }
        className={`w-8 h-8 rounded-full  flex items-center justify-center`}
      >
        <span className="text-white font-semibold">
          {player?.userName?.charAt(0)}
        </span>
      </div>
      <span
        style={
          myData.userName === player?.userName
            ? { color: "rgba(59 130 246)" }
            : { color: "white" }
        }
        className="  text-lg"
      >
        {player?.userName} {isHost ? "👑" : ""}
      </span>
      <ContextMenu isContextMenuOpen={isContextMenuOpen} playerData={player} />
    </div>
  );
};

export default UserInRoom;
