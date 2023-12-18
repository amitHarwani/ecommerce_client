import { useTranslation } from "react-i18next";
import { DrawerOption } from "../../constants";
import { useAppSelector } from "../../store";
import CloseIcon from "../icons/CloseIcon";

interface DrawerProps {
  headingText: string;
  optionsList: Array<DrawerOption>;
  onOptionClickHandler(option: DrawerOption): void;
  onDrawerCloseHandler(): void;
  show: boolean;
}
const Drawer = (props: DrawerProps) => {
  const {
    headingText,
    optionsList,
    onOptionClickHandler,
    onDrawerCloseHandler,
    show = false,
  } = props;

  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <aside
      className={`flex flex-col fixed top-0 h-screen w-3/5 bg-gradient-to-b from-black via-stone-600 to-black p-4
      transition-all duration-500
      ${
        isRTL
          ? `${show ? "right-0" : "-right-full"}`
          : `${show ? "left-0" : "-left-full"}`
      }
      `}
    >
      <div
        className={`flex items-center justify-between ${
          isRTL && "flex-row-reverse"
        }`}
      >
        <span className={`capitalize text-2xl tracking-wider text-zinc-50`}>
          {headingText}
        </span>
        <button onClick={onDrawerCloseHandler}>
          <CloseIcon className="w-3 h-3 text-zinc-50" />
        </button>
      </div>

      <div className={`flex flex-col mt-6`}>
        {optionsList.map((option) => (
          <div className={`mb-4`} key={option.id}>
            <button
              className={`w-full flex ${isRTL && "flex-row-reverse"}`}
              onClick={() => onOptionClickHandler(option)}
            >
              {option?.icon}

              <span className="text-zinc-50 capitalize">
                {t(option.textKey)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Drawer;
