import { useTranslation } from "react-i18next";
import { BREAKPOINTS, SelectionMenuItem } from "../../constants";
import { RefObject, createRef, useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useBreakpointCheck from "../../hooks/useBreakpointCheck";
import UpArrow from "../icons/UpArrow";
import { useAppSelector } from "../../store";

interface SelectionMenuProps {
  items: SelectionMenuItem[];
  onItemSelect(item: SelectionMenuItem): void;
  heading: string;
  headingClassName?: string;
}
const SelectionMenu = (props: SelectionMenuProps) => {
  const {
    items,
    heading,
    onItemSelect,
    headingClassName = "capitalize",
  } = props;

  const isLG = useBreakpointCheck(BREAKPOINTS.lg);
  const { t } = useTranslation();
  const isRTL = useAppSelector(state => state.language.isRTL);

  const [isMenuShown, setIsMenuShown] = useState(false);

  const selectionMenuRef: RefObject<HTMLDivElement> = createRef();
  const [clickedOutside] = useOutsideClick(selectionMenuRef);


  const toggleMenu = () => {
    setIsMenuShown((prev) => !prev);
  };

  const menuItemClickHandler = (item: SelectionMenuItem) => {
    setIsMenuShown(false);
    onItemSelect(item);
  };

  useEffect(() => {
    if (clickedOutside) {
      setIsMenuShown(false);
    }
  }, [clickedOutside]);

  return (
    <div className="relative" ref={selectionMenuRef}>
      <button onClick={toggleMenu} className={`flex justify-between items-center w-full ${isRTL ? 'flex-row-reverse': ''} ${headingClassName}`}>
        <span>{heading}</span>
        {!isLG && (
          <UpArrow
            className={`w-4 h-4 ${!isMenuShown && "rotate-180"}`}
          />
        )}
      </button>

      {isMenuShown && (
        <div
          className={`absolute p-4 z-10 bg-transparent lg:bg-black rounded w-full lg:w-fit`}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`${index === items.length - 1 ? "mb-2" : "mb-4"}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <button
                onClick={() => menuItemClickHandler(item)}
                className={`text-sm capitalize text-zinc-50 flex items-center`}
              >
                <span className="w-5 h-5">{item.icon && item.icon}</span>
                <span className={`whitespace-nowrap ${isRTL ? 'mr-2': 'ml-2'}`}>
                  {t(item.textKey)}{" "}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectionMenu;
