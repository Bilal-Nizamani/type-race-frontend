import Image from "next/image";
const CarComponent = ({ userData }) => {
  const { carPosition, wpm, car } = userData;

  return (
    <div
      className={`h-4  w-full  pl-[100px]  bg-slate-300  transform -translate-y-1/2`}
    >
      <div
        style={{ marginLeft: `calc(${carPosition * 100}% - 70px)` }}
        className={` w-12 mb-14  transition-all duration-300 ease-in-out`}
      >
        <div className="mt-[-2rem] flex">
          <Image width={100} height={100} src={`/${1}.png`} alt="" />
          <span className="text-white">{wpm} </span>
        </div>
      </div>
    </div>
  );
};

export default CarComponent;
