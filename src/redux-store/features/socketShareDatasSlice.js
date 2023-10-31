import { createSlice } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played

const initialState = {
  car: "",
  userName: "",
  accuracy: 0,
  finishingTime: "",
  place: null,
  carPosition: 0,
  arrayOfwrittenWords: "",
  isRaceCompleted: false,
};

export const socketShareDatasSlice = createSlice({
  name: "game-data-to-send",
  initialState,
  reducers: {
    addUserShareData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUserShareData } = socketShareDatasSlice.actions;
export default socketShareDatasSlice.reducer;
