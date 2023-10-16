import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {signin: false, isLoggedIn: localStorage.getItem("isLoggedIn") === "true" },
  reducers: {
    setSignin(state, action) {
      state.signin = action.payload;
    },
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout(state) {
      localStorage.removeItem("userId");
      localStorage.setItem("isLoggedIn", "false");
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
