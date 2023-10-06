import React, { useEffect, useState } from "react";
import socketService from "@/config/socket";
import { useSelector } from "react-redux";

const ContextMenu = ({ isContextMenuOpen, playerData, myData, amIHost }) => {
  const isSocketConnected = useSelector(
    (state) => state.socketConnection.connection
  );
  const [isVisible, setIsVisible] = useState(true);

  const onKick = () => {
    if (isSocketConnected) {
      socketService.socket.emit("kick", playerData);
    }
  };

  const hideContextMenu = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(isContextMenuOpen);
    console.log("asdfasd");
  }, [isContextMenuOpen]);

  return (
    <div className="absolute top-[100%] w-full z-20  right-0">
      <div
        className={`context ${isVisible ? "block" : "hidden"}  rounded-lg`}
        onClick={hideContextMenu}
      >
        <div className="context_item   hover:bg-gray-600 bg-black  border-white">
          <div className="inner_item px-3 py-2">Open Profile</div>
        </div>
        {myData?.userName !== playerData?.userName && (
          <>
            <div className="context_item   hover:bg-gray-600 bg-black  border-white">
              <div className="inner_item px-3 py-2">Message</div>
            </div>
            {amIHost && (
              <div
                onClick={onKick}
                className="context_item  hover:bg-gray-600 bg-black border-white"
              >
                <div className="inner_item px-3 py-2">KICK Player</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContextMenu;
