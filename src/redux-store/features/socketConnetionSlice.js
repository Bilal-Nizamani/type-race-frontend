import { createSlice } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played
const initialState = { connection: false, type: "" };

export const socketConnectionSlice = createSlice({
  name: "socket-connection",
  initialState,
  reducers: {
    storeConnection: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { storeConnection } = socketConnectionSlice.actions;
export default socketConnectionSlice.reducer;
