import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../services/auth/AuthTypes";
import { UserCart } from "../services/cart/CartTypes";
import CartService from "../services/CartService";
import ApiError from "../services/ApiError";

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

export const getUserCartThunk = createAsyncThunk(
  'auth/getUserCart',
  async() => {
    const response = await CartService.getUserCart();
    if(!(response instanceof ApiError)){
      return response;
    }
    else{
      return null;
    }
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(getUserCartThunk.fulfilled, (state, {payload}) => {
      state.userCart = payload;
    })
  }
});

export const {logIn, logOut, updateUserCart} = AuthSlice.actions;
export default AuthSlice;
