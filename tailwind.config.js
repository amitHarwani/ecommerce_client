/** @type {import('tailwindcss').Config} */
import {BREAKPOINTS} from "./src/constants";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: BREAKPOINTS,
    extend: {
      fontFamily: {
        poppinsRegular: ["poppins-regular"],
        poppinsBlack: ["poppins-black"],
        poppinsBold: ["poppins-bold"],
        poppinsLight: ["poppins-light"],
        poppinsMedium: ["poppins-medium"],
        poppinsItalic: ["poppins-italic"],
      }
    },
  },
  plugins: [],
};
