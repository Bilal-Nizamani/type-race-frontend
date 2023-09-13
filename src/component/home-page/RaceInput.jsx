"use client";
import _ from "lodash";
import React, { useRef, useEffect, useState, memo } from "react";
import {
  manipulateStringNdColors,
  modifyString,
  rmSpce,
} from "@/utils/serviceFunction";
import socket from "@/config/socket";
import { useDispatch } from "react-redux";
import { addGamePlayData } from "@/redux-store/features/gamePlaySlice";
const RaceInput = memo(function RaceInput({
  isGameBeingPlayed,
  getCurrText,
  gameEnd,
  gameEnder,
}) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  let wrongText = "";
  const [wrongWords, setWrongWords] = useState([]);
  const [originalStringArray, setOriginalStringArray] = useState([]);
  const [isMistakeDeleted, setIsMistakeDeleted] = useState(false);
  const [currUserText, setCurrUserText] = useState("");
  const [arrayOfwrittenWords, setArrayOfwrittenWords] = useState([]);
  const [wrongsLetters, setWrongsLetters] = useState([]);
  const [orginalString, setOrginalString] = useState("");
  const [rightText, setRightText] = useState([]);
  const [currText, setCurrText] = useState("");

  useEffect(() => {
    socket.on("match_found", (raceText) => {
      setOriginalStringArray(raceText.split(" "));
      setWrongWords([]);
      setWrongsLetters([]);
      setOrginalString(raceText);
      setRightText([]);
      setArrayOfwrittenWords([]);
      setCurrText(raceText);
    });
  }, []);

  useEffect(() => {
    getCurrText(currText);
  }, [getCurrText, currText]);

  useEffect(() => {
    if (isGameBeingPlayed) {
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current.focus(); // Focus on the input element after a short delay
        }, 100);
      }
    }
    if (!isGameBeingPlayed) {
      setCurrUserText("");
    }
  }, [isGameBeingPlayed]);

  // * adding data gameplayData
  useEffect(() => {
    dispatch(
      addGamePlayData({
        arrayOfwrittenWords,
        orginalString,
      })
    );
  }, [arrayOfwrittenWords, orginalString, dispatch]);

  // Handle user input change
  const handleInput = (e) => {
    const text = e.target.value;
    stringHandler(text);
  };
  // Handle user input and compare with the original string
  const stringHandler = (userInput) => {
    let isMatch1 = true;
    try {
      // cheking if user completed race
      if (originalStringArray.join("") === userInput) {
        dispatch(
          addGamePlayData({
            arrayOfwrittenWords,
            originalStringArray,
            wrongsLetters,
            wrongWords,
          })
        );

        const gameWinText = "You won";
        setArrayOfwrittenWords(rightText);
        setRightText([]);
        setOriginalStringArray([]);
        gameEnder(gameWinText, true);
        setCurrText(gameWinText);
        setCurrUserText("");
        return;
      }
      if (
        wrongText.length === 0 &&
        userInput[userInput.length - 1] === " " &&
        userInput.trimEnd() === originalStringArray[0]
      ) {
        // adding new logic here to check word by word
        setArrayOfwrittenWords([...rightText]);
        setCurrUserText("");
        setCurrText(() => {
          return manipulateStringNdColors(
            modifyString(rightText, true),
            orginalString,
            0,
            false
          );
        });

        setRightText((old) => {
          const updatedRightText = [...old];
          updatedRightText.pop();
          updatedRightText.push(rmSpce(userInput));
          updatedRightText.push("");
          return updatedRightText;
        });

        setOriginalStringArray((oldVl) => {
          const updatedOriginalStringArray = [...oldVl];
          updatedOriginalStringArray.shift();
          return updatedOriginalStringArray;
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
        // Update the current user text
        setCurrUserText(userInput);

        // Set the mistake deletion flag to true
        setIsMistakeDeleted(true);

        // Update the rightText array
        const cleanedUserInput = rmSpce(userInput);
        const rgtTxtLngt = rightText.length;
        if (rgtTxtLngt > 0) {
          rightText[rgtTxtLngt - 1] = cleanedUserInput;
        } else {
          rightText[rgtTxtLngt] = cleanedUserInput;
        }

        // Update the currText state using manipulation functions
        setCurrText(() =>
          manipulateStringNdColors(
            modifyString(rightText, false),
            orginalString,
            0,
            false
          )
        );
      } else {
        const startWrongInx = rightText?.[rightText.length - 1]?.length ?? 0;
        const wrongText = userInput.slice(startWrongInx);
        if (wrongText.length <= 9) {
          setCurrUserText(userInput);
        } else return;

        setWrongWords((old) => {
          // Create a copy of the old state array
          const updatedWords = [...old];
          // Get the last word in the array
          const lastWord = updatedWords[updatedWords.length - 1];
          // Compare the last word with the original word
          if (originalStringArray[0] !== lastWord) {
            // Push the original word into the array if it's different
            updatedWords.push(originalStringArray[0]);
          }
          // Return the updated state
          return updatedWords;
        });
        setWrongsLetters((prevState) => {
          // Create a copy of the previous state array
          const updatedState = [...prevState];

          // Check if the array is empty
          if (updatedState.length === 0) {
            // Push a new mistake object into the array
            updatedState.push({
              mistakeWord: originalStringArray[0],
              mistakeLetters: wrongText,
            });
            // Return the updated state
            return updatedState;
          } else {
            // Get the last mistake object from the array
            let lastMistake = _.cloneDeep(
              updatedState[updatedState.length - 1]
            );

            // Check if the mistake word is the same as the original word
            const isWordSame =
              lastMistake.mistakeWord === originalStringArray[0];

            // Check if the current wrongText is longer than the previous one
            const isLongerMistake =
              lastMistake.mistakeLetters.length < wrongText.length;

            // Check if a mistake was already deleted
            if (isMistakeDeleted) {
              // Push a new mistake object into the array
              updatedState.push({
                mistakeWord: originalStringArray[0],
                mistakeLetters: wrongText,
              });
              // Return the updated state
              return updatedState;
            } else if (isWordSame && isLongerMistake) {
              // Update the mistake letters in the last mistake object
              lastMistake.mistakeLetters = wrongText;
              // Return the updated state
              return updatedState;
            } else {
              // Return the original state as no changes are needed
              return updatedState;
            }
          }
        });

        setCurrText(() => {
          return manipulateStringNdColors(
            wrongText,
            orginalString,
            modifyString(rightText, false).length,
            true
          );
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      disabled={gameEnd}
      onPaste={() => e.preventDefault()}
      value={currUserText}
      onChange={handleInput}
      className={`p-2 border-2 text-3xl border-gray-900 text-green-600 min-h-[70px] max-w-[700px] w-[100%] mx-2 ${
        gameEnd ? "border-[1px] select-none pointer-events-none" : ""
      }`}
    />
  );
});

export default RaceInput;
