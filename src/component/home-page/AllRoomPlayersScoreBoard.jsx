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
    <div className="bg-gray-900 text-white m-4 p-4">
      <h2 className="text-2xl font-semibold mb-4">Player Scoreboard</h2>
      {allUsersArray.map((user, index) => (
        <div
          key={index}
          className=" bg-gray-900  justify-center rounded-lg shadow-sm shadow-white p-4 mb-4 sm:flex"
        >
          <div className="sm:w-1/4 sm:mr-4">
            {/* User's Car Image */}
            <div
              style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.7)" }}
              className="flex bg-gray-900 rounded-lg flex-col justify-center m-auto text-center items-center "
            >
              <h3 className="text-lg w-full p-2 mb-2 sm:mb-0">
                {user.userName}
              </h3>
              <Image
                width={60}
                height={60}
                src={`/${user.car}.png`}
                alt={`Car Image ${user.car}`}
                className="w-16  h-16  mx-auto"
              />
            </div>
          </div>
          <div className="flex-1 text-center">
            {/* User Information */}
            <p>
              <strong>Accuracy:</strong>
              <br /> {user.accuracy}%
            </p>
            <p>
              <strong>Finishing Time:</strong>
              <br />
              {user.finishingTime} seconds
            </p>
          </div>
          <div className="flex-1 text-center">
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
