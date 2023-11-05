import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  userName: "bila" + Math.random() * 900000 + 20,
  name: "b" + Math.random() * 900000 + 20,
  car: Math.floor(Math.random() * 4 + 1),
  averageWpm: Math.random() * 100 + 20,
  expLevel: 1,
  races: 0,
  lastFifteenGamesWpmAvrg: 0,
  avtars: [],
  avtar: 1,
  status: "idle",
  premium: false,
  error: null,
  awards: [],
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      // Make your API call here using axios
      const response = await axios.get("/api/userdata");
      return response.data; // Assuming the response contains user data
    } catch (error) {
      throw error;
    }
  }
);

export const userDataSlice = createSlice({
  name: "user-datsa",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state = { ...state, ...action.payload };
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
