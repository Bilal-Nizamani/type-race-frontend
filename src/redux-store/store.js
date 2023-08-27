import { configureStore } from '@reduxjs/toolkit';
import gameDataSlice from './features/gameDataSlice';


const store = configureStore({
  reducer:{ gameData: gameDataSlice}
});

export default store;

