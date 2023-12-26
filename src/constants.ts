/* DROPDOWN */
export enum DropdownTypes {
  noBorderDarkBg,
}

export type DropdownItem = {
  id: string | number;
  textKey: string;
};

export interface LanguageDropdownItem extends DropdownItem {
  id: string;
  textKey: string;
}

/* SELECTION MENU */
export type SelectionMenuItem = {
  id: string | number;
  textKey: string;
  icon?: React.ReactElement
};

/* LANGUAGE */
export enum SUPPORTED_LANGUAGES {
  english = "en",
  arabic = "ar",
}
export enum LANGUAGE_DISPLAY_NAMES {
  english = "English",
  arabic = "عربي",
}
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.english;

/* LOCAL STORAGE */
export enum LOCAL_STORAGE_KEYS {
  selectedLanguage = "lang",
  accessToken = "accessToken",
}

/* RESPONSIVE: BREAKPOINTS */
/* NOTE: Breakpoints have to be ordered in ascending order */
export enum BREAKPOINTS {
  "sm" = "640px",
  "md" = "768px",
  "lg" = "1024px",
  "xl" = "1280px",
  "2xl" = "1536px",
}

/* DRAWER OPTION */
export type NavigationOption = {
  id: string | number;
  textKey: string;
  icon?: React.ReactElement;
  navigateTo: string;
  customComponent?: React.ReactElement
};

/* DRAWER OPTION */
export type DrawerOption = {
  id: string | number;
  textKey: string;
  icon?: React.ReactElement;
};

/* BUTTON TYPES */
export enum ButtonTypes {
  noBackgroundAndBorder,
  primaryButton,
  secondaryButton,
}

/* LINK TYPES */
export enum LinkTypes {
  default,
  red
}

/* DATE TIME FORMATS */
export enum DATE_TIME_FORMATS {
  standardDateWithTime = "YYYY-MM-DDTHH:mm:ss",
}

export type DURATION = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/* Category Icon Type */
export type CategoryIcon = { [id: string]: React.ReactElement };

/* Card Container */
export enum CARD_CONTAINER_OPTION {
  CAROUSEL,
  RIGHT_BUTTON,
  BOTTOM_BUTTON,
}

/* Company Gurantee */
export type COMPANY_GURANTEE = {
  id: string | number,
  icon: React.ReactElement;
  headingKey: string;
  descriptionKey: string;
};

/* Arrow Button Types */
export enum ARROW_BUTTONS {
  UP,
  RIGHT,
  DOWN, 
  LEFT
}
/* Query param strings */
export enum QUERY_PARAMS {
  category = "category",
  productId = "productId",
  categoryId = "categoryId"
}

/* Paths */
export enum ROUTE_PATHS {
  products = "/products",
  product = "/product",
  login = "/login"
}

export enum PUBLIC_IMAGE_PATHS {
  loginSideImage = "/images/loginsideimage.png",
  defaultProductImage = "/images/defaultproduct.png"
}

export const REGEX_PATTERNS = {
  emailPattern : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
}

export enum LOGIN_TYPES  {
  emailPassword = "EMAIL_PASSWORD",
  github = "GITHUB",
  google = "GOOGLE"
}

export enum USER_ROLES {
  admin = "ADMIN",
  user = "USER"
}

export type LoginFormFields = {
  email: string;
  password: string;
};