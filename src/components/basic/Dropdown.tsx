import { RefObject, createRef, useEffect, useMemo, useState } from "react";
import { DropdownItem, DropdownTypes } from "../../constants";
import DownArrow from "../icons/DownArrow";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../store";
import useOutsideClick from "../../hooks/useOutsideClick";

interface DropdownProps {
  type: DropdownTypes;
  onChange(selectedItem: object): void;
  itemsList: Array<DropdownItem>;
  defaultSelectedItem?: DropdownItem;
}

const Dropdown = (props: DropdownProps) => {
  const {
    type = DropdownTypes.noBorderDarkBg,
    onChange,
    itemsList,
    defaultSelectedItem,
  } = props;

  const { t } = useTranslation();
  const isRTL = useAppSelector((state) => state.language.isRTL);

  const dropdownRef: RefObject<HTMLDivElement> = createRef();

  const [selectedItem, setSelectedItem] = useState(
    defaultSelectedItem ? defaultSelectedItem : null
  );
  const [isDropdownMenuShown, setIsDropdownMenuShown] = useState(false);

  const [clickedOutside] = useOutsideClick(dropdownRef);

  const toggleDropdownMenu = () => {
    setIsDropdownMenuShown((prev) => !prev);
  };
  const itemChangeHandler = (item: DropdownItem): void => {
    setSelectedItem(item);
    onChange(item);
    toggleDropdownMenu();
  };

  const typeStyles: {
    mainButton: string;
    textColor: string;
    menuContainer: string;
  } = useMemo(() => {
    switch (type) {
      case DropdownTypes.noBorderDarkBg: {
        return {
          mainButton: "border-none outline-none",
          textColor: "text-zinc-50",
          menuContainer: "bg-black",
        };
      }
      default:
        return { mainButton: "", textColor: "", menuContainer: "" };
    }
  }, [type]);

  /* Hiding Dropdown if a click is made outside */
  useEffect(() => {
    if (clickedOutside) {
      setIsDropdownMenuShown(false);
    }
  }, [clickedOutside]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdownMenu}
        className={`flex justify-between items-center ${
          typeStyles.mainButton
        } ${isRTL && "flex-row-reverse"}`}
      >
        <span className={`text-sm capitalize ${typeStyles.textColor}`}>
          {selectedItem ? t(selectedItem.textKey) : t("select")}
        </span>

        <DownArrow
          className={`h-5 w-5 ${isRTL ? "mr-1" : "ml-1"} ${
            typeStyles.textColor
          } ${isDropdownMenuShown && "rotate-180"}`}
        />
      </button>
      {isDropdownMenuShown && (
        <div
          className={`absolute p-2 z-10 ${typeStyles.menuContainer} rounded-b-md`}
        >
          {/* Selected Item Comes First */}
          {selectedItem && (
            <div key={selectedItem.id}>
              <button
                onClick={() => itemChangeHandler(selectedItem)}
                className={`text-sm capitalize ${typeStyles.textColor}`}
              >
                {t(selectedItem.textKey)}
              </button>
            </div>
          )}
          {itemsList.map(
            (item) =>
              item.id !== selectedItem?.id && (
                <div key={item.id}>
                  <button
                    onClick={() => itemChangeHandler(item)}
                    className={`text-sm capitalize ${typeStyles.textColor}`}
                  >
                    {t(item.textKey)}
                  </button>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
