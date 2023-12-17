import { useMemo, useState } from "react";
import { DropdownItem, DropdownTypes } from "../../constants";
import DownArrow from "../icons/DownArrow";
import { useTranslation } from "react-i18next";

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

  const [selectedItem, setSelectedItem] = useState(
    defaultSelectedItem ? defaultSelectedItem : null
  );
  const [isDropdownMenuShown, setIsDropdownMenuShown] = useState(false);

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

  return (
    <div className="relative">
      <button
        onClick={toggleDropdownMenu}
        className={`flex justify-between items-center ${typeStyles.mainButton}`}
      >
        <span className={`text-sm ${typeStyles.textColor}`}>
          {selectedItem ? selectedItem.text : t("select")}
        </span>

        <DownArrow
          className={`ml-1 h-5 w-5 ${typeStyles.textColor} ${
            isDropdownMenuShown && "rotate-180"
          }`}
        />
      </button>
      {isDropdownMenuShown && (
        <div
          className={`absolute p-2 ${typeStyles.menuContainer} rounded-b-md w-full`}
        >
          {/* Selected Item Comes First */}
          {selectedItem && (
            <div key={selectedItem.id}>
              <button
                onClick={() => itemChangeHandler(selectedItem)}
                className={`text-sm ${typeStyles.textColor} font-bold`}
              >
                {selectedItem.text}
              </button>
            </div>
          )}
          {itemsList.map(
            (item) =>
              item.id !== selectedItem?.id && (
                <div key={item.id}>
                  <button
                    onClick={() => itemChangeHandler(item)}
                    className={`text-sm ${typeStyles.textColor}`}
                  >
                    {item.text}
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
