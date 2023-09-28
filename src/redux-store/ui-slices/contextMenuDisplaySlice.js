import { createSlice } from "@reduxjs/toolkit";
// data that would would shared through socket.io when game is being played
const initialState = {
  display: false,
};

export const contextMenuDispaly = createSlice({
  name: "Room players data",
  initialState,
  reducers: {
    addContextMenuDisplay: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { addContextMenuDisplay } = contextMenuDispaly.actions;
export default contextMenuDispaly.reducer;
