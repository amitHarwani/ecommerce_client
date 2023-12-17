import { SUPPORTED_LANGUAGES } from "../constants";

export const isRTL = (language: string): boolean => {
    switch(language){
        case SUPPORTED_LANGUAGES.english: return false;
        case SUPPORTED_LANGUAGES.arabic: return true;
        default: return false;
    }
}