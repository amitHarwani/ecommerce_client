import { RefObject, createRef, useCallback, useEffect, useState } from "react";
import { DrawerOption } from "../../constants";
import Drawer from "./Drawer";
import HamburgerIcon from "../icons/HamburgerIcon";
import useOutsideClick from "../../hooks/useOutsideClick";

interface HamburgerProps {
  headingText: string;
  optionsList: Array<DrawerOption>;
  onOptionClickHandler: (option: DrawerOption) => void;
}
const Hamburger = (props: HamburgerProps) => {
  const { headingText, optionsList, onOptionClickHandler } = props;

  const [isDrawerShown, setIsDrawerShown] = useState(false);

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

  return (
    <div ref={hamburgerRef}>
      <button onClick={toggleDrawer}>
        <HamburgerIcon className="w-5 h-5" />
      </button>
      <Drawer
        headingText={headingText}
        optionsList={optionsList}
        onOptionClickHandler={onOptionClickHandler}
        onDrawerCloseHandler={toggleDrawer}
        show={isDrawerShown}
      />
    </div>
  );
};

export default Hamburger;
