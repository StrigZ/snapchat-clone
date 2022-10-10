import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedImage: null,
  user: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const selectApp = (state) => state.app.value;

export default appSlice.reducer;
