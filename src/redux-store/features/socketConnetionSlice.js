import { createSlice } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played
const initialState = { roomListConnection: false, autoRoomConnection: false };

export const socketConnectionSlice = createSlice({
  name: "socet-connection",
  initialState,
  reducers: {
    storeConnection: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { storeConnection } = socketConnectionSlice.actions;
export default socketConnectionSlice.reducer;
