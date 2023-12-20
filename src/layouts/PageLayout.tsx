import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { getCurrentBreakpoint } from "../utils/breakpointsHelper";
import { updateBreakpoint } from "../store/BreakpointSlice";

import HeaderContainer from "../components/business/header/container/HeaderContainer";

const PageLayout = () => {
  const dispatch = useDispatch();


  /* Updating current breakpoint: As per tailwind css */
  const checkForBreakpointUpdates = useCallback(() => {
    const breakpoint = getCurrentBreakpoint();
    if (breakpoint) {
      dispatch(updateBreakpoint(breakpoint));
    }
  }, [dispatch]);

  useEffect(() => {
    checkForBreakpointUpdates();
    window.addEventListener("resize", checkForBreakpointUpdates);

    return () => {
      window.removeEventListener("resize", checkForBreakpointUpdates);
    };
  }, [checkForBreakpointUpdates]);

  return (
    <>
      <HeaderContainer />

    </>
  );
};

export default PageLayout;
