import { createSlice } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played
const initialState = {};

export const roomConnectedPlayersDataSlice = createSlice({
  name: "Room players data",
  initialState,
  reducers: {
    addPlayingPlayersData: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { addPlayingPlayersData } = roomConnectedPlayersDataSlice.actions;
export default roomConnectedPlayersDataSlice.reducer;
