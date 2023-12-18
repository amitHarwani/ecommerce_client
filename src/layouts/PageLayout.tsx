import { useDispatch } from "react-redux";
import InfoHeader from "../components/business/InfoHeader";
import { useCallback, useEffect } from "react";
import { getCurrentBreakpoint } from "../utils/breakpointsHelper";
import { updateBreakpoint } from "../store/BreakpointSlice";
import { DRAWER_ITEMS } from "../data/applicationData";
import { useTranslation } from "react-i18next";
import Hamburger from "../components/basic/Hamburger";

const PageLayout = () => {
  const dispatch = useDispatch();

  const {t} = useTranslation();

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
      <InfoHeader />
      <Hamburger headingText={t('companyName')} optionsList={DRAWER_ITEMS} />
    </>
  );
};

export default PageLayout;
