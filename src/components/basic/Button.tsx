import { ReactElement, useMemo } from "react";
import { ButtonTypes } from "../../constants";

interface ButtonProps {
  buttonType?: ButtonTypes;
  children: ReactElement;
  className?: string;
  onClickHandler(): void;
}
const Button = (props: ButtonProps) => {
  const {
    buttonType = ButtonTypes.noBackgroundAndBorder,
    children,
    className,
    onClickHandler,
  } = props;

  // Styles based on type
  const buttonStyles = useMemo(() => {
    switch (buttonType) {
      case ButtonTypes.primaryButton:
        return "bg-darkRed text-zinc-50 rounded";
      case ButtonTypes.secondaryButton:
        return "bg-yellow text-black font-poppinsMedium rounded";
      default:
        return "";
    }
  }, [buttonType]);

  return (
    <button
      className={`transition transform hover:scale-105 active:scale-95 ${buttonStyles} ${className}`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
