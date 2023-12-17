import { LANGUAGE_DIRECTIONS, SUPPORTED_LANGUAGES } from "../constants";

export const getLanguageDirection = (language: string): LANGUAGE_DIRECTIONS => {
    switch(language){
        case SUPPORTED_LANGUAGES.english: return LANGUAGE_DIRECTIONS.ltr;
        case SUPPORTED_LANGUAGES.arabic: return LANGUAGE_DIRECTIONS.rtl;
        default: return LANGUAGE_DIRECTIONS.ltr;
    }
}