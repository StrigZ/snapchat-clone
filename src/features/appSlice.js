import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {},
});

export const {} = appSlice.actions;

export const selectApp = (state) => state.app.value;

export default appSlice.reducer;
