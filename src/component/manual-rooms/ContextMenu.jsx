import React, { useEffect, useState } from "react";

const ContextMenu = ({ isContextMenuOpen, player }) => {
  const [isVisible, setIsVisible] = useState(true);

  const showContextMenu = (event) => {
    // event.preventDefault();
    setIsVisible(true);
    // Position the context menu based on event.pageX and event.pageY
    // const contextMenu = document.querySelector(".context");
    // contextMenu.style.top = `${event.pageY}px`;
    // contextMenu.style.left = `${event.pageX}px`;
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
        <div className="context_item  hover:bg-gray-600 bg-black border-white">
          <div className="inner_item px-3 py-2">KICK Player</div>
        </div>
        <div className="context_item   hover:bg-gray-600 bg-black  border-white">
          <div className="inner_item px-3 py-2">Open Profile</div>
        </div>
        <div className="context_item   hover:bg-gray-600 bg-black  border-white">
          <div className="inner_item px-3 py-2">Message</div>
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
