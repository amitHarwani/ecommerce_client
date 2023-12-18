import { BREAKPOINTS } from "../constants";

export const getCurrentBreakpoint = () => {
  const width = window.innerWidth;

  const breakpoints = Object.entries(BREAKPOINTS);

  /* NOTE: Breakpoints have to be ordered in ascending order */
  for (let counter = breakpoints.length - 1; counter >= 0; --counter) {
    const [breakpointName, breakpointWidth] = breakpoints[counter];
    const breakpointWidthInInt = parseInt(breakpointWidth);

    if (width >= breakpointWidthInInt) {
      return breakpointName;
    }
  }
  return "";
};

/* To check the screen size */
export const isCurrentBreakpoint = (breakpointWidth: string) => {
  const breakpointWidthInInt = parseInt(breakpointWidth);
  if (window.innerWidth >= breakpointWidthInInt) {
    return true;
  }
  return false;
};
