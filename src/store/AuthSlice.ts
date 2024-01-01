import { createSlice } from "@reduxjs/toolkit";
import { User } from "../services/auth/AuthTypes";

interface AuthSliceTypes {
  isLoggedIn: boolean;
  userDetails: User | null;
}
const initialState: AuthSliceTypes = {
  isLoggedIn: false,
  userDetails: null,
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logIn(state, { payload }) {
      state.isLoggedIn = true;
      state.userDetails = payload;
    },
    logOut() {
      return initialState;
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;
export default AuthSlice;
