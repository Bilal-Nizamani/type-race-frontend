import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wpmObj: {},
  wpm: 0,
  givenString: "",
  writenString: [],
  totalMistakes: 0,
  typeTime: "",
  accuracy: 0,
  gameType: "normal",
  mistakesArray: [],
  isGameCompleted: false,
};

export const gameDataSlice = createSlice({
  name: "game-data",
  initialState,
  reducers: {
    addGameData: (state, action) => {
      return action.payload;
    },
  },
});

export const { addGameData } = gameDataSlice.actions;
export default gameDataSlice.reducer;
