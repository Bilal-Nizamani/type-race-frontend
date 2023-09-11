import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

const AllRoomPlayersScoreBoard = () => {
  const [allUsersArray, setAllUsersArray] = useState([]);
  const data = useSelector((state) => state.roomConnectedPlayersData);

  useEffect(() => {
    const dataAray = [];
    Object.keys(data).forEach((item) => {
      dataAray.push(data[item]);
    });

    setAllUsersArray(dataAray);
  }, [data]);
  return (
    <div className="bg-gray-300 m-4 p-4">
      <h2 className="text-2xl font-semibold mb-4">Player Scoreboard</h2>
      {allUsersArray.map((user, index) => (
        <div
          key={index}
          className="text-white bg-black justify-center rounded-lg shadow-md p-4 mb-4"
        >
          {/* User's Car Image */}
          <div className=" flex m-auto text-center w-full bg- items-center justify-evenly">
            <h3 className="text-3xl bg-gray-600 text-white w-full p-2 mb-2">
              {user.userName}
            </h3>
          </div>
          {/* User Information */}
          <div className="text-center gap-10  justify-center items-center flex">
            {/* Username */}
            <div className="  bg-gray-600 shadow-lg rounded-3xl    border-gray-950 p-4">
              <Image
                width={50}
                height={40}
                src={`/${user.car}.png`}
                alt={`Car Image ${user.car}`}
                className="w-14 h-14 rounded-full mx-auto"
              />
            </div>
            {/* Other Information */}
            <p>
              <strong>Accuracy:</strong>
              <br /> {user.accuracy}%
            </p>
            <p>
              <strong>Finishing Time:</strong>
              <br />
              {user.finishingTime} seconds
            </p>
            <p>
              <strong>Place:</strong>
              <br /> {user.place}st
            </p>
            <p>
              <strong>
                Words Per Minute (WPM):
                <br />
              </strong>{" "}
              {user.wpm}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRoomPlayersScoreBoard;
