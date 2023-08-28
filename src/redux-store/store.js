import { configureStore } from '@reduxjs/toolkit';
import gameDataSlice from './features/gameDataSlice';
import socketShareDatasSlice from './features/socketShareDatasSlice';


const store = configureStore({
  reducer:{ gameData: gameDataSlice, socketSharedData: socketShareDatasSlice}
});

export default store;





