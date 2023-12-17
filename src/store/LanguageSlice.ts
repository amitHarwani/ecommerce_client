import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE, LOCAL_STORAGE_KEYS } from "../constants";
import { getLanguageDirection } from "../utils/languageHelpers";


const initialState = {
    selectedLanguage: localStorage.getItem(LOCAL_STORAGE_KEYS.selectedLanguage) || DEFAULT_LANGUAGE,
    languageDirection: getLanguageDirection(localStorage.getItem(LOCAL_STORAGE_KEYS.selectedLanguage) || DEFAULT_LANGUAGE)
}
const LanguageSlice = createSlice({
    name: "languageSlice",
    initialState,
    reducers: {
        changeLanguage(state, {payload}) {
            state.selectedLanguage = payload;
            state.languageDirection = getLanguageDirection(payload);
            localStorage.setItem(LOCAL_STORAGE_KEYS.selectedLanguage, payload);
        },
        reset(state){
            state.selectedLanguage = DEFAULT_LANGUAGE;
            state.languageDirection = getLanguageDirection(DEFAULT_LANGUAGE);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.selectedLanguage)
        }
    }
})

export const {changeLanguage} = LanguageSlice.actions;
export default LanguageSlice;