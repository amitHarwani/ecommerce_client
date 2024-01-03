import { SUPPORTED_LANGUAGES } from "../constants";
import store from "../store";
export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const formatAmount = (amount: number, currency: string): string => {
    const currentLanguage = store.getState().language.selectedLanguage;
    if(currentLanguage === SUPPORTED_LANGUAGES.arabic){
        return new Intl.NumberFormat('ar-EN', {style: 'currency', currency: currency}).format(amount); 
    }
    return new Intl.NumberFormat('en-AE', {style: 'currency', currency: currency}).format(amount);
}