"use client";
import React, { memo, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import CarComponent from "./CarComponent";
import Image from "next/image";

const CarRoad = memo(function CarRoad() {
  const dispatch = useDispatch();
  const [myData, setMyData] = useState({ carPosition: 0 });
  const [otherPlayersData, setOtherPlayersData] = useState([]);
  const romPlData = useSelector((state) => state.roomConnectedPlayersData);
  const gameData = useSelector((state) => state.gamePlayData);
  const myProfileData = useSelector((state) => state.userProfileData);
  const { arrayOfwrittenWords, orginalString } = gameData;
  const { userName, car } = myProfileData;

  useEffect(() => {
    const writtenTextPercent =
      (arrayOfwrittenWords?.length * 100) / orginalString?.split(" ").length;

    if (writtenTextPercent > 0) {
      dispatch(addUserShareData({ carPosition: writtenTextPercent / 100 }));
    }
  }, [dispatch, arrayOfwrittenWords, orginalString]);

  useEffect(() => {
    const romPlayersDataArray = [];
    Object.keys(romPlData).forEach((item) => {
      if (romPlData[item].userName === userName) {
        setMyData(romPlData[item]);

        return;
      } else {
        romPlayersDataArray.push(romPlData[item]);
      }
    });

    setOtherPlayersData(romPlayersDataArray);
  }, [romPlData, userName]);

  return (
    <div
      style={{
        height: (otherPlayersData?.length + 1) * 80 + "px",
      }}
      className=" flex justify-around gap-3 pb-1 transform  transition-transform bg-gray-700  flex-col shadow-t-md shadow-md shadow-white "
    >
      <div className="h-3  w-full mt-10 pl-[100px]  bg-slate-300  transform -translate-y-1/2">
        <div
          style={{
            marginLeft: `calc(${myData.carPosition * 100}% - 85px)`,
          }}
          className=" w-16  transition-all duration-300 ease-in-out"
        >
          <div className="mt-[-3rem]">
            <Image width={100} height={100} src={`/${car}.png`} alt="error" />
          </div>
        </div>
      </div>
      {otherPlayersData?.map((item) => {
        return (
          <div key={item.userName}>
            <CarComponent userData={item} />
          </div>
        );
      })}
    </div>
  );
});

export default CarRoad;
