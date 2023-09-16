import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wpmObj: {},
  wpm: 0,
  givenString: "",
  writenString: [],
  typeTime: "",
  accuracy: 0,
  gameType: "normal",
  mistakesArray: [],
  isGameCompleted: false,
};

export const gameDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addGameData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addGameData } = gameDataSlice.actions;
export default gameDataSlice.reducer;
