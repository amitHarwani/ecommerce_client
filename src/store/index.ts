import { configureStore } from "@reduxjs/toolkit";
import LanguageSlice from "./LanguageSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        language: LanguageSlice.reducer
    }
})

export type ReduxRootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<ReduxRootState> = useSelector;

export default store;