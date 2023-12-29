import { createSlice } from "@reduxjs/toolkit";
import { User } from "../services/auth/AuthTypes";
import { UserCart } from "../services/cart/CartTypes";

interface AuthSliceTypes {
  isLoggedIn: boolean,
  userDetails: User | null,
  userCart: UserCart | null
}
const initialState: AuthSliceTypes = {
  isLoggedIn: false,
  userDetails: null,
  userCart: null
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logIn(state, { payload }) {
      state.isLoggedIn = true;
      state.userDetails = payload;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.userCart = null;
    },
    updateUserCart(state, {payload}){
      state.userCart = payload
    }
  },
});

export const {logIn, logOut, updateUserCart} = AuthSlice.actions;
export default AuthSlice;
