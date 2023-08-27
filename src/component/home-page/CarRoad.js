import React, { useEffect, useState, useRef } from "react";
import car_img from '../../../public/jeep.png'
import Image from "next/image";

const CarRoad = ({
  rightText,
  orginalString,
  arrayOfwrittenWords,
  isCounting,
}) => {
  orginalString = orginalString.split(" ");
  const [carPosition, setCarPosition] = useState(0);

  const carRoad = useRef(null);
  useEffect(() => {
    const roadWidth = carRoad.current.offsetWidth;
    const writtenTextPercent = (arrayOfwrittenWords.length * 100) / orginalString.length;

    if (writtenTextPercent > 0) {
      setCarPosition((roadWidth - 70) * (writtenTextPercent / 100));
    } else {
      setCarPosition(0);
    }
  }, [orginalString.length, arrayOfwrittenWords.length]);

  return (
    <div className="min-h-[160px] relative   bg-gray-300">
      <div ref={carRoad} className="h-1  w-full  bg-gray-700 absolute top-[35%] transform -translate-y-1/2">
        <div
          style={{ left: `${carPosition}px` }}
          className=" w-12   absolute -top-1/2 transform -translate-y-1/2 rounded-md text-white flex items-center justify-center transition-all duration-300 ease-in-out"
        >
        <div className="mt-[-2rem]">
         <Image src={car_img} alt=""/>
         </div>
        </div>
      </div>
    </div>
  );
};

export default CarRoad;
