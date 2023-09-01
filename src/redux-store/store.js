import { configureStore } from "@reduxjs/toolkit";
import gameDataSlice from "./features/gameDataSlice";
import socketShareDatasSlice from "./features/socketShareDatasSlice";
import roomConnectedPlayersDataSlice from "./features/roomConnectedPlayersDataSlice";
import gamePlaySlice from "./features/gamePlaySlice";

const store = configureStore({
  reducer: {
    gameData: gameDataSlice,
    socketSharedData: socketShareDatasSlice,
    roomConnectedPlayersData: roomConnectedPlayersDataSlice,
    gamePlayData: gamePlaySlice,
  },
});

export default store;
