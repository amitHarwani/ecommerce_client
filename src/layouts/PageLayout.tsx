import { useDispatch } from "react-redux";
import { RefObject, createRef, useCallback, useEffect, useState } from "react";
import { getCurrentBreakpoint } from "../utils/breakpointsHelper";
import { updateBreakpoint } from "../store/BreakpointSlice";

import HeaderContainer from "../components/business/header/container/HeaderContainer";
import FooterContainer from "../components/business/footer/container/FooterContainer";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  const dispatch = useDispatch();

  const [headerHeight, setHeaderHeight] = useState("0px");

  const headerContainerRef: RefObject<HTMLDivElement> = createRef();

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

  useEffect(() => {
    setHeaderHeight(`${headerContainerRef.current?.clientHeight}px`);
  }, [headerContainerRef]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        <HeaderContainer ref={headerContainerRef} />
        <main style={{marginTop: headerHeight}}>
          <Outlet />
        </main>
      </div>
      <FooterContainer />
    </div>
  );
};

export default PageLayout;
