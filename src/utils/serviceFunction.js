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
export { manipulateStringNdColors, modifyString, rmSpce };
