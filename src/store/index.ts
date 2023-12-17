import { configureStore } from "@reduxjs/toolkit";
import LanguageSlice from "./LanguageSlice";

const store = configureStore({
    reducer: {
        language: LanguageSlice.reducer
    }
})

export default store;