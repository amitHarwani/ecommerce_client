import { ReactElement, useMemo } from "react";
import { ButtonTypes } from "../../constants";
import LoadingSpinner from "../icons/LoadingSpinner";

interface ButtonProps {
  buttonType?: ButtonTypes;
  children: ReactElement;
  className?: string;
  onClickHandler(): void;
  isLoading?: boolean;
}
const Button = (props: ButtonProps) => {
  const {
    buttonType = ButtonTypes.noBackgroundAndBorder,
    children,
    className,
    onClickHandler,
    isLoading = false,
  } = props;

  // Styles based on type
  const buttonStyles = useMemo(() => {
    switch (buttonType) {
      case ButtonTypes.primaryButton:
        return "bg-darkRed text-zinc-50 rounded";
      case ButtonTypes.secondaryButton:
        return "bg-white text-black font-poppinsMedium rounded border border-grey";
      default:
        return "";
    }
  }, [buttonType]);

  return (
    <button
      className={`transition transform lg:hover:scale-105 active:scale-95 lg:active:scale-95 ${buttonStyles} ${className}`}
      onClick={onClickHandler}
    >
      {!isLoading ? children : <LoadingSpinner className={'w-8 h-8 text-gray-200 fill-black'} />}
    </button>
  );
};

export default Button;
