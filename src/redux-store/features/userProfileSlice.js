import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "bila" + Math.random() * 900000 + 20,
  name: "b" + Math.random() * 900000 + 20,
  car: Math.floor(Math.random() * 4 + 1),
  averageWpm: Math.random() * 100 + 20,
  avtar: 1,
  awards: "",
};

export const userDataSlice = createSlice({
  name: "user-datsa",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
