import { configureStore } from "@reduxjs/toolkit";
import gameDataSlice from "./features/gameDataSlice";
import socketShareDatasSlice from "./features/socketShareDatasSlice";
import roomConnectedPlayersDataSlice from "./features/roomConnectedPlayersDataSlice";
import gamePlaySlice from "./features/gamePlaySlice";
import socketConnectionSlice from "./features/socketConnetionSlice";
import userProfileSlice from "./features/userProfileSlice";
import contextMenuDisplaySlice from "./ui-slices/contextMenuDisplaySlice";

const store = configureStore({
  reducer: {
    gameData: gameDataSlice,
    socketSharedData: socketShareDatasSlice,
    roomConnectedPlayersData: roomConnectedPlayersDataSlice,
    gamePlayData: gamePlaySlice,
    socketConnection: socketConnectionSlice,
    userProfileData: userProfileSlice,
    contextMenuDisplay: contextMenuDisplaySlice,
  },
});

export default store;
