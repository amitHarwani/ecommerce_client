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
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.english;

export enum LANGUAGE_DIRECTIONS {
  ltr = "ltr",
  rtl = "rtl",
}

/* LOCAL STORAGE */
export enum LOCAL_STORAGE_KEYS {
  selectedLanguage = "lang",
  accessToken = "accessToken",
}
