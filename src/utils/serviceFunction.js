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
function processArray(arr) {
  if (arr.length < 31) return arr;
  const firstValue = arr[0];
  const lastValue = arr[arr.length - 1];

  // Calculate the step size to select average numbers between the first and last values
  const stepSize = (lastValue - firstValue) / 29;

  const shortenedArr = [firstValue]; // Start with the first value

  // Iterate through the array and select average numbers
  for (let i = 1; i < 29; i++) {
    const average = firstValue + stepSize * i;
    shortenedArr.push(arr[Math.floor(average)]);
  }

  shortenedArr.push(lastValue); // Add the last value

  return shortenedArr;
}
export { manipulateStringNdColors, modifyString, rmSpce, processArray };
