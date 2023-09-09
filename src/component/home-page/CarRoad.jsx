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
  const socketSharedData = useSelector((state) => state.socketSharedData);
  const { arrayOfwrittenWords, orginalString } = gameData;
  const { userName, car } = socketSharedData;

  useEffect(() => {
    const writtenTextPercent =
      (arrayOfwrittenWords?.length * 100) /
      // cuting 1 from length because extra value of " " get added at the end when
      // splited by " "
      (orginalString?.split(" ").length - 1);
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
        height: (otherPlayersData?.length + 1) * 70 + "px",
      }}
      className=" flex justify-around gap-14 pb-1  flex-col bg-slate-800   border-[5px]"
    >
      <div className="h-4  w-full mt-10 pl-[100px]  bg-slate-300  transform -translate-y-1/2">
        <div
          style={{
            marginLeft: `calc(${myData.carPosition * 100}% - 70px)`,
          }}
          className=" w-12  transition-all duration-300 ease-in-out"
        >
          <div className="mt-[-2rem]">
            <Image width={50} height={40} src={`/${car}.png`} alt="asdfasdf" />
          </div>
        </div>
      </div>

      {otherPlayersData?.map((item) => {
        return <CarComponent key={item.userName} userData={item} />;
      })}
    </div>
  );
});

export default CarRoad;
