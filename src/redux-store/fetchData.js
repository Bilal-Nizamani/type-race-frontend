import { createAsyncThunk } from '@reduxjs/toolkit';
const getData = async ()=>{
  return {data:'HI'}
}
// Create an async thunk
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  
  const response = await getData() ;
  return response.data;
});