import { createSlice } from "@reduxjs/toolkit";

const saveAuth = sessionStorage.getItem("auth");

const initialState = {
  isLoggedIn: false,
  username: null,
  loading: false,
  error: null,
  result: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: saveAuth ? JSON.parse(saveAuth) : initialState,
  reducers: {
    logout: () => {
      sessionStorage.removeItem("auth");
      localStorage.removeItem("accessToken");

      return initialState;
    },

    socialLoginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.error = null;

      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          isLoggedIn: true,
          username: action.payload.username,
          error: null,
        }),
      );
    },
  },
});

export const { logout, socialLoginSuccess } = authSlice.actions;
export default authSlice.reducer;
