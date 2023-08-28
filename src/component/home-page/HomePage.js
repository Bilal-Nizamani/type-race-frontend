"use client";

// Import necessary modules and components
import React, { useEffect, useState, useRef, useCallback } from "react";
import Counter from "./Counter";
import CarRoad from "./CarRoad";
import { manipulateStringNdColors,modifyString,rmSpce } from "@/utils/serviceFunction";
import  MyLineChart from './MyLineChart.js'
import socket from '@/config/socket';
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { addUserShareData } from "@/redux-store/features/socketShareDatasSlice";
import _isEqual from "lodash/isEqual";



// Sample texts for the race game
const texts = ["This will start a new test in custom mode. Words that you mistyped more often or words that you typed much slower will be weighted higher and appear more often.",];

const RaceGame = () => {
  const currentSocketSharedData = useSelector(
    (state) => state.socketSharedData,
    shallowEqual
  );
  const previousSocketSharedDataRef = useRef(currentSocketSharedData);






  const dispatch = useDispatch();

  const [currText, setCurrText] = useState("");
  // userTExt
  const [currUserText, setCurrUserText] = useState("");
  // gameend or not
  const [gameEnd, setGameEnd] = useState(true);
  const [isRaceCompleted, setIsRaceCompleted] = useState(false)
  // to show speed or not or reset car

  // completed-game or Not;
  // start-game-counting
  const [count, setCount] = useState(2);
  const [isCounting, setIsCounting] = useState(false);
  // array of right writen words
  const [rightText, setRightText] = useState([]);
  const [arrayOfwrittenWords, setArrayOfwrittenWords] = useState([]);


  // wrong writen words nd letters
  let wrongText = "";
  // stringOfwrongLetters
  const [wrongsLetters, setWrongsLetters] = useState([])
  // array of wrongWrods
  const [wrongWords, setWrongWords] = useState([])
  //
  const [orginalString, setOrginalString] = useState("");
  // array of strings
  const [originalStringArray, setOriginalStringArray] = useState([]);
  
  const [roomData, setRoomData] = useState({roomName:'',userName:''})
  // 
  const [isMistakeDeleted, setIsMistakeDeleted]  = useState (false)

  const inputRef = useRef(null);

  // Start the game countdown
  const startCounting = useCallback(() => {

    const raceText = texts[Math.floor(Math.random() * texts.length)];
    setCurrText(raceText);
    setOrginalString(raceText);
    setOriginalStringArray(raceText.split(" "));
    setCurrUserText("");
    gameEnder(raceText,false);

    setArrayOfwrittenWords([]);
    setIsCounting(true);
    setCount(2); // Reset count to 5 when starting again
    setRightText([]);
    setWrongsLetters([])
    setWrongWords([])
  },[]);

    // start-Game
    const startGame = useCallback(() => {
      setGameEnd(false);
    }, []);

  // Handle the completion of countdown
  const countingCompleted = useCallback(() => {
    if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus(); // Focus on the input element after a short delay
        }, 100);
      }
      dispatch(addUserShareData({userName:'bilal'+Math.random(), car:"cultus"+Math.random()}))


      startGame();  }, [inputRef, startGame,dispatch]);

  // End the game
  const gameEnder = (startingGameText,checkIsGameComplete) => {
    setCurrText(startingGameText);
    setGameEnd(true);
    setCurrUserText("");
    setIsRaceCompleted(checkIsGameComplete)
    socket.on('room_players_data',(players_data)=>{
        console.log(players_data)
    })
  };

  // Handle user input and compare with the original string
  const stringHandler = (userInput) => {
    let isMatch1 = true;

    // cheking if user completed race
    if (
      originalStringArray.length === 1 &&
      userInput === originalStringArray[0]
    ) {
      const gameWinText = "You won";
      setArrayOfwrittenWords(rightText);
      setRightText([]);
      setOriginalStringArray([]);
      
      gameEnder(gameWinText,true);

      return;
    }
    if (
      wrongText.length === 0 &&
      userInput[userInput.length - 1] === " " &&
      userInput.trimEnd() === originalStringArray[0]
    ) {
      // adding new logic here to check word by word
      setArrayOfwrittenWords([...rightText]);
      setCurrUserText('');

      setCurrText(() => {
        return manipulateStringNdColors(
          modifyString(rightText, true),
          orginalString,
          0,
          false,
        );
      });

      setRightText((old) => {
        old.pop();
        old.push(rmSpce(userInput));
        old.push("");
        return old;
      });
      setOriginalStringArray((oldVl) => {
        oldVl.shift();
        return oldVl;
      });
      return;
    } else if (wrongText.length > 0) {
      wrongText = userInput;
    }

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== originalStringArray[0][i]) {
        isMatch1 = false;
        break;
      }
    }
    if (isMatch1) {
      setCurrUserText(userInput);

      setIsMistakeDeleted(true)
      let rgtTxtLngt = rightText.length
      rgtTxtLngt > 0
        ? (rightText[rgtTxtLngt - 1] = rmSpce(userInput))
        : (rightText[rgtTxtLngt] = rmSpce(userInput));

      setCurrText(() => {
        return manipulateStringNdColors(
          modifyString(rightText, false),
          orginalString,
          0,
          false,
        );
      });
    } else {
      
      let startWrongInx = rightText[rightText?.length - 1]?.length
      startWrongInx = startWrongInx === undefined? 0:startWrongInx
       
      wrongText = userInput.slice(startWrongInx);

      if(wrongText.length> 9 ){

        return 
      }else{
        setCurrUserText(userInput);

      }

   

      setWrongWords((oldVal)=>{
          originalStringArray[0] === oldVal[oldVal.length-1]? oldVal : oldVal.push(originalStringArray[0])
          return oldVal
      })
      


      setWrongsLetters((prevState)=>{
        
        if(prevState.length < 1 ){
          setIsMistakeDeleted (false)

          prevState.push({mistakeWord:originalStringArray[0], mistakeLetters:wrongText})
          return prevState
        }else{ 
            const lstMmitake = prevState[prevState.length-1]
            const isWordSame = lstMmitake.mistakeWord === originalStringArray[0]
            const condition  =  lstMmitake.mistakeLetters.length < wrongText.length
          if(condition && isWordSame){
            setIsMistakeDeleted (false)


            prevState[prevState.length-1].mistakeLetters  = wrongText
            return prevState
          }
          else if(isMistakeDeleted){

            prevState.push({mistakeWord:originalStringArray[0], mistakeLetters:wrongText})
            return prevState
          }
          else return prevState
          }

 
      },)

      setCurrText(() => {
        return manipulateStringNdColors(
          wrongText,
          orginalString,
          modifyString(rightText, false).length,
          true,
        );
      });
    }
  };



  // Handle user input change
  const handleInput = (e) => {
    const text = e.target.value;
    stringHandler(text);
  };

  // Prevent pasting in the input field
  const handlePast = (e) => {
    e.preventDefault();
  };

  // socket.io implemeteion
  // send data if game is palying
  useEffect(() => {
    // if cheking if value is not he same when sending socket data
    if (!_isEqual(currentSocketSharedData, previousSocketSharedDataRef.current) && !gameEnd, !isCounting) {
   
      socket.emit('player_data',currentSocketSharedData)
    }

    // Update the previousSocketSharedDataRef to the current value
    previousSocketSharedDataRef.current = currentSocketSharedData;
  }, [currentSocketSharedData, gameEnd, isCounting]);

    const createRoomHandler = ()=>{
    // if(roomData.roomName.length>1, roomData.userName.length>1){
    //   socket.emit('create_room',roomData)
      
    // }else{alert('fill the data')}

    socket.emit('user_ready_to_play','i am wiaint' )
  }
  useEffect(() => {
    socket.on('match_found', (room)=>{
     console.log('found this ',room)
     startCounting(true)
    })
   
     socket.on('room_created',(roomConfirmation)=>{
     setRoomCreatedMessage(roomConfirmation)
     })

     // Clean up the socket connection on component unmount
     return () => {
       socket.disconnect();
     };
   }, [startCounting]);

  // Start the game timer
  useEffect(() => {
    if (isCounting && count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isCounting && count === 0) {
      countingCompleted();
      setIsCounting(false);   

    }
  }, [count, isCounting, countingCompleted,]);


  return (
    <>
  <div className="relative bg-gray-100 p-8 flex flex-col  2xl:w-[1300px] md:w-[500px] lg:w-[1000px] justify-center">
  <div className="absolute top-8 left-[45%] text-3xl font-semibold" id="title">
    Typing Game
  </div>
 
  <CarRoad
    rightText={rightText}
    orginalString={orginalString}
    isCounting={isCounting}
    arrayOfwrittenWords={arrayOfwrittenWords}
  />
   <div
    className={`${
      count < 1 ? "hidden" : ""
    }   text-white bg-black p-5 top-[3%] left-[47%] rounded-xl w-fit absolute
     text-4xl font-bold`}
  >
    {count}
  </div>
  <div className="text-center mt-8 text-2xl">
    <div
      id="text"
      dangerouslySetInnerHTML={{ __html: currText }}
      className="mb-4"
    ></div>
  </div>
  <div className="flex flex-col items-center justify-center ">
    <input
      ref={inputRef}
      type="text"
      disabled={gameEnd}
      onPaste={handlePast}
      value={currUserText}
      onChange={handleInput}
      className={`p-2 border-2 border-gray-900 w-96 mx-2 ${
        gameEnd ? "border-[1px] select-none pointer-events-none" : ""
      }`}
    />
    <Counter
      gameEnd={gameEnd}
      rightText={rightText}
      arrayOfwrittenWords={arrayOfwrittenWords}
      isCounting={isCounting}
      wrongsLetters={wrongsLetters}
      orginalString={orginalString}
      isRaceCompleted={isRaceCompleted}
      gameEnder={gameEnder}
    />
  </div>
  <button
    className="mt-2 p-3 px-5 text-[1.5rem] mx-auto  bg-blue-500 text-white rounded-md hover:bg-blue-600"
    onPaste={(e) => {
      e.preventDefault();
    }}
    onClick={createRoomHandler}
  >
    Play New
  </button>
  {gameEnd && (<div className=" shadow-md my-5">    <div className="text-center text-3xl ">Mistakes </div>

    <div className="mt-4 flex gap-6 justify-center flex-wrap  ">
      {wrongWords.map((wrongWord, index) => {
        return (
          <div key={index} className="flex-[30%] text-[18px] px-1 font-semibold bg-blue-100 text-red-700">
            {wrongWord}
          </div>
        );
       })}
    </div>
    </div>  )}
  <MyLineChart isRaceCompleted={isRaceCompleted} />
</div>


    </>
  );
};

export default RaceGame;
