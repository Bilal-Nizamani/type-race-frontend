import { configureStore } from "@reduxjs/toolkit";
import gameDataSlice from "./features/gameDataSlice";
import socketShareDatasSlice from "./features/socketShareDatasSlice";
import roomConnectedPlayersDataSlice from "./features/roomConnectedPlayersDataSlice";
import gamePlaySlice from "./features/gamePlaySlice";
import socketConnectionSlice from "./features/socketConnetionSlice";
import userProfileSlice from "./features/userProfileSlice";

const store = configureStore({
  reducer: {
    gameData: gameDataSlice,
    socketSharedData: socketShareDatasSlice,
    roomConnectedPlayersData: roomConnectedPlayersDataSlice,
    gamePlayData: gamePlaySlice,
    socketConnection: socketConnectionSlice,
    userProfileData: userProfileSlice,
  },
});

export default store;
