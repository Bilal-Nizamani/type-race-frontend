import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import CarComponent from "./CarComponent";
import Image from "next/image";

const CarRoad = ({}) => {
  const dispatch = useDispatch();
  const [myData, setMyData] = useState({});
  const [otherPlayersData, setOtherPlayersData] = useState();

  const data = useSelector((state) => {
    return {
      romPlData: state.roomConnectedPlayersData,
      gameData: {
        orginalString: state.gamePlayData.orginalString,
        arrayOfwrittenWords: state.gamePlayData.arrayOfwrittenWords,
      },
      userName: state.socketSharedData.userName,
      car: state.socketSharedData.car,
    };
  });

  const { romPlData, gameData, userName, car } = data;

  useEffect(() => {
    console.log(gameData.orginalString);
    const writtenTextPercent =
      (gameData.arrayOfwrittenWords.length * 100) /
      gameData.orginalString.split(" ").length;

    if (writtenTextPercent > 0) {
      dispatch(addUserShareData({ carPosition: writtenTextPercent / 100 }));
    }
  }, [gameData.orginalString, dispatch, gameData.arrayOfwrittenWords]);

  useEffect(() => {
    const romPlayersDataArray = [];
    Object.keys(romPlData).forEach((item) => {
      if (item.userName === userName) {
        console.log("asdf");
        setMyData(romPlData[item]);
        return;
      }

      romPlayersDataArray.push(romPlData[item]);
    });
    setOtherPlayersData(romPlayersDataArray);
  }, [romPlData, userName]);

  return (
    <div
      style={{
        height: otherPlayersData?.length * 70 + "px",
      }}
      className=" flex justify-around gap-14 pb-1  flex-col bg-slate-800   border-[5px]"
    >
      <div className="h-4  w-full mt-10 pl-[100px]  bg-slate-300  transform -translate-y-1/2">
        <div
          style={{
            marginLeft: `calc(${
              myData?.carPosition ? myData?.carPosition : 0
            }% - 70px)`,
          }}
          className=" w-12  transition-all duration-300 ease-in-out"
        >
          <div className="mt-[-2rem]">
            <Image width={50} height={40} src={`/${car}}.png`} alt="asdfasdf" />
          </div>
        </div>
      </div>

      {otherPlayersData?.map((item) => {
        return <CarComponent key={item.userName} userData={item} />;
      })}
    </div>
  );
};

export default CarRoad;
