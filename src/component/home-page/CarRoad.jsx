import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import CarComponent from "./CarComponent";
import img from "../../../public/1.png";

const CarRoad = ({}) => {
  const dispatch = useDispatch();
  const [carPosition, setCarPosition] = useState(0);
  const [otherPlayersData, setOtherPlayersData] = useState();

  const romPlData = useSelector((state) => state.roomConnectedPlayersData);
  const gameData = useSelector((state) => {
    return {
      orginalString: state.gamePlayData.orginalString,
      arrayOfwrittenWords: state.gamePlayData.arrayOfwrittenWords,
    };
  });

  useEffect(() => {
    // const roadWidth = carRoad.current.offsetWidth;
    const writtenTextPercent =
      (gameData.arrayOfwrittenWords.length * 100) /
      gameData.orginalString.split(" ").length;

    if (writtenTextPercent > 0) {
      // setCarPosition((roadWidth - 70) * (writtenTextPercent / 100));
      setCarPosition(writtenTextPercent);
      dispatch(addUserShareData({ carPosition: writtenTextPercent / 100 }));
    } else {
      setCarPosition(0);
    }
  }, [gameData.orginalString, dispatch, gameData.arrayOfwrittenWords]);

  useEffect(() => {
    const romPlayersDataArray = [];
    Object.keys(romPlData).forEach((item) => {
      romPlayersDataArray.push(romPlData[item]);
    });
    console.log(romPlayersDataArray);
    setOtherPlayersData(romPlayersDataArray);
  }, [romPlData]);

  return (
    <div
      style={{
        height: (otherPlayersData?.length + 1) * 70 + "px",
      }}
      className=" flex justify-around gap-14 pb-1  flex-col bg-slate-800   border-[5px]"
    >
      <div className="h-4  w-full mt-10 pl-[100px]  bg-slate-300  transform -translate-y-1/2">
        <div
          style={{ marginLeft: `calc(${carPosition}% - 70px)` }}
          className=" w-12  transition-all duration-300 ease-in-out"
        >
          <div className="mt-[-2rem]">
            <Image width={50} height={40} src={"/1.png"} alt="" />
          </div>
        </div>
      </div>

      {otherPlayersData?.map((item, index) => {
        return (
          <CarComponent
            key={item.userName}
            index={index + 1}
            carPosition={item.carPosition}
          />
        );
      })}
    </div>
  );
};

export default CarRoad;
