import React from "react";
import { AddressClass } from "./services/address/AddressTypes";

/* DROPDOWN */
export enum DropdownTypes {
  noBorderDarkBg,
  borderedLightBg
}

export type DropdownItem = {
  id?: string | number;
  textKey?: string;
  text?: string;
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
  displayedDateWithTime = "Do MMM YYYY, hh:mmA"
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
  categoryId = "categoryId",
  productNameSearch = "productNameSearch"
}

/* Paths */
export enum ROUTE_PATHS {
  products = "/products",
  product = "/product",
  productSearch = "/product-search",
  login = "/login",
  signup = "/signup",
  cart = "/cart",
  checkout = "/checkout",
  paymentFeedback = "/payment-feedback",
  manageAccount = "/manage-account",
  orders = "/orders",
}


/* IMAGES IN PUBLIC FOLDER */
export enum PUBLIC_IMAGE_PATHS {
  loginSideImage = "/images/loginsideimage.png",
  defaultProductImage = "/images/defaultproduct.png"
}

/* REGEX PATTERNS */
export const REGEX_PATTERNS = {
  emailPattern : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  numberPattern: /^[0-9]*$/,
  countryCodePattern: /^\+[0-9]{1,3}$/,
  phoneNumberPattern: /^[0-9]{9,10}$/
}


/* LOGIN FORM FIELDS */
export type LoginFormFields = {
  email: string;
  password: string;
};

/* SIGN UP FORM FIELDS */
export type SignupFormFields = {
  email: string,
  password: string,
  username: string,
  confirmPassword: string
}

/* TYPES OF TOAST MESSAGES */
export enum TOAST_MESSAGE_TYPES {
  success = "SUCCESS",
  error = "ERROR"
}

/* ADDRESS FORM KEYS */
export enum ADDRESS_FORM_KEYS  {
  country,
  state,
  city, 
  addressLine1,
  addressLine2,
  pincode
}

export type AddressFormFields = {
  country: DropdownItem,
  city: DropdownItem,
  state: DropdownItem,
  addressLine1: string,
  addressLine2: string,
  pincode: string
}

export type CheckoutFormFields = {
  address: AddressClass
}

export type ProfileFormFields = {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  countryCode: string
}

export type CheckoutApplyCouponCodeFields = {
  couponCode: string
}

export type RADIO_BUTTON_TYPE<T> = {
  label?: string;
  customElement?: React.ReactElement;
  data: T
  isDefaultSelected: boolean;
  id: string;
}