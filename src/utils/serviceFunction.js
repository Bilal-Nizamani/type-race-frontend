// changing colors nd of the writen string
const manipulateStringNdColors = (string1, string2, index, wrong) => {
  if (index < 0 || index >= string2.length) {
    throw new Error("Index out of bounds");
  }

  const spanStart = `<span class='  text-green-500 border-r-[1px] border-black underline'>`;
  const spanStartWrong = `<span class='  bg-red-500'>`;
  const spanEnd = "</span>";

  let result;
  if (!wrong) {
    // if user type right text
    result =
      string2.substring(0, index) +
      spanStart +
      string2.substring(index, index + string1.length) +
      spanEnd +
      string2.substring(index + string1.length);
  } else {
    // if user typed wrong text
    let length = string1.length;
    result =
      spanStart +
      string2.substring(0, index) +
      spanEnd +
      spanStartWrong +
      string2.substring(index, index + length) +
      spanEnd +
      string2.substring(index + length);
  }

  return result;
};
// converts array in to string
function modifyString(inputArray, isLast) {
  if (!Array.isArray(inputArray)) {
    throw new Error("Input must be an array");
  }
  return isLast ? inputArray.join(" ") + " " : inputArray.join(" ");
}

//   removes space from string
// space remover from string
function rmSpce(inputString) {
  return inputString.replace(/ /g, "");
}

/// that select lower  average of 30 value to the length of array
// works only for numbers
function processArray(wpmAndSecondsArrObj) {
  let obj = { wpmArray: [], secondsArray: [] };
  let checkIfStartedTyping = false;
  let index = 0;
  for (const key in wpmAndSecondsArrObj) {
    index++;
    if (!checkIfStartedTyping && wpmAndSecondsArrObj[key] > 0)
      checkIfStartedTyping = true;
    else if (wpmAndSecondsArrObj.length - index === 30)
      checkIfStartedTyping = true;
    if (checkIfStartedTyping) {
      obj.wpmArray.push(wpmAndSecondsArrObj[key]);
      obj.secondsArray.push(key);
    }
  }

  if (obj.wpmArray.length <= 30) return obj; // If the array is already 30 or fewer elements, return as is

  // Check if the length of wpmArray is greater than 30 before shortening
  if (obj.wpmArray.length > 30) {
    const stepSize = Math.floor((obj.wpmArray.length - 2) / 28);
    const shortenedWpmArray = [obj.wpmArray[0]];
    const shortenedSecondsArray = [obj.secondsArray[0]];

    for (let i = 1; i < 29; i++) {
      const index = i * stepSize + 1;
      shortenedWpmArray.push(obj.wpmArray[index]);
      shortenedSecondsArray.push(obj.secondsArray[index]);
    }

    // Modify the original object to replace wpmArray and secondsArray
    obj.wpmArray = shortenedWpmArray;
    obj.secondsArray = shortenedSecondsArray;
  }

  return obj;
}

export { manipulateStringNdColors, modifyString, rmSpce, processArray };
