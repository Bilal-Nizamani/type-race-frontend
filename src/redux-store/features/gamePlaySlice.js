import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rightText: [],
  isCounting: false,
  orginalString: "",
  arrayOfwrittenWords: [],
  gameEnd: true,
  typeTime: "",
  originalStringArray: [],
  wrongsLetters: {},
  isRaceCompleted: false,
  place: "1/4",
  wrongWords: [],
};

export const gamePlaySlice = createSlice({
  name: "gameplay-data",
  initialState,
  reducers: {
    addGamePlayData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addGamePlayData } = gamePlaySlice.actions;
export default gamePlaySlice.reducer;
