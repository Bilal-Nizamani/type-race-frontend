import { configureStore } from '@reduxjs/toolkit';
import gameDataSlice from './features/gameDataSlice';
import socketShareDatasSlice from './features/socketShareDatasSlice';
import roomConnectedPlayersDataSlice from './features/roomConnectedPlayersDataSlice'


const store = configureStore({
  reducer:{ gameData: gameDataSlice, socketSharedData: socketShareDatasSlice ,roomConnectedPlayersData:roomConnectedPlayersDataSlice}
});

export default store;





