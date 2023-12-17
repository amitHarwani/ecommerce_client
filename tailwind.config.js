/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
