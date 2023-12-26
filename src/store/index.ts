import { configureStore } from "@reduxjs/toolkit";
import LanguageSlice from "./LanguageSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import BreakpointSlice from "./BreakpointSlice";
import AuthSlice from "./AuthSlice";

const store = configureStore({
    reducer: {
        language: LanguageSlice.reducer,
        breakpoint: BreakpointSlice.reducer,
        auth: AuthSlice.reducer
    }
})
/* useAppSelector for typescript */
export type ReduxRootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;

export default store;