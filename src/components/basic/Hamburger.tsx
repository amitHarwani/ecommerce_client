import { RefObject, createRef, useCallback, useEffect, useState } from "react";
import { DrawerOption, NavigationOption } from "../../constants";
import Drawer from "./Drawer";
import HamburgerIcon from "../icons/HamburgerIcon";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useLocation } from "react-router-dom";

interface HamburgerProps {
  headingText: string;
  navList?: Array<NavigationOption>;
  optionsList?: Array<DrawerOption>
}
const Hamburger = (props: HamburgerProps) => {
  const { headingText, navList, optionsList } = props;

  const [isDrawerShown, setIsDrawerShown] = useState(false);

  const location = useLocation();
  const toggleDrawer = useCallback(() => {
    setIsDrawerShown((prev) => !prev);
  }, [setIsDrawerShown]);

  const hamburgerRef: RefObject<HTMLDivElement> = createRef();

  const [clickedOutside] = useOutsideClick(hamburgerRef);

  useEffect(() => {
    if (!clickedOutside) {
      return;
    }
    setIsDrawerShown(false);
  }, [clickedOutside]);

  /* Hide drawer once route changes */
  useEffect(() => {
    setIsDrawerShown(false);
  }, [location])
  
  return (
    <div ref={hamburgerRef}>
      <button onClick={toggleDrawer}>
        <HamburgerIcon className="w-5 h-5" />
      </button>
      <Drawer
        headingText={headingText}
        navList={navList}
        optionsList={optionsList}
        onDrawerCloseHandler={toggleDrawer}
        show={isDrawerShown}
      />
    </div>
  );
};

export default Hamburger;
