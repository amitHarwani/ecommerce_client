/* DROPDOWN */
export enum DropdownTypes {
  noBorderDarkBg,
}

export type DropdownItem = {
  id: string | number;
  text: string;
};

/* LANGUAGE */
export enum SUPPORTED_LANGUAGES {
  english = "en",
  arabic = "ar",
}
export enum LANGUAGE_DISPLAY_NAMES {
  english = "English",
  arabic = "عربي"
}
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.english;


/* LOCAL STORAGE */
export enum LOCAL_STORAGE_KEYS {
  selectedLanguage = "lang",
  accessToken = "accessToken",
}
