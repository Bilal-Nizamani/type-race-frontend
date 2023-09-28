import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  userName: "",
  averageWpm: 0,
  level: 1,
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
