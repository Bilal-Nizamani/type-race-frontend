import Image from "next/image";
const CarComponent = ({ userData }) => {
  const { carPosition, wpm, car } = userData;

  return (
    <div className={`h-3   w-full  pl-[100px]  bg-slate-300 `}>
      <div
        style={{ marginLeft: `calc(${carPosition * 100}% - 70px)` }}
        className={` w-16 flex  transition-all duration-300 ease-in-out`}
      >
        <div className="mt-[-3rem] flex">
          <Image width={100} height={100} src={`/${car}.png`} alt="" />
          <span className="text-white">{wpm} </span>
        </div>
      </div>
    </div>
  );
};

export default CarComponent;
