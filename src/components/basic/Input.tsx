import { ForwardedRef, forwardRef, useId, useState } from "react";
import { useAppSelector } from "../../store";
import HidePasswordIcon from "../icons/HidePasswordIcon";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import ErrorMessage from "./ErrorMessage";

interface InputProps {
  placeholder: string;
  type: string;
  className?: string;
  autoComplete?: string;
  errorMessage?: string;
}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      placeholder = "",
      type = "text",
      className = "",
      autoComplete = "",
      errorMessage = "",
      ...otherProps
    } = props;

    const id = useId();

    const isRTL = useAppSelector((state) => state.language.isRTL);

    const [isPasswordVisisble, setIsPasswordVisible] = useState(false);

    const togglePassword = () => {
      setIsPasswordVisible((prev) => !prev);
    };
    if (type === "password") {
      return (
        <div className="flex flex-col">
          <div
            className={`flex justify-between border-b border-b-grey pb-1 focus-within:border-b-black`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <input
              ref={ref}
              placeholder={placeholder}
              type={isPasswordVisisble ? "text" : type}
              {...otherProps}
              id={id}
              className={`flex-1 outline-none ${className}`}
              dir={isRTL ? "rtl" : "ltr"}
              autoComplete={autoComplete}
            />
            <button
              onClick={togglePassword}
              className="h-fit self-end ml-2"
              type="button"
            >
              {isPasswordVisisble ? (
                <HidePasswordIcon className="w-4 h-4 text-black" />
              ) : (
                <ShowPasswordIcon className="w-4 h-4 text-black" />
              )}
            </button>
          </div>
          {errorMessage && <ErrorMessage className="mt-1 text-sm" message={errorMessage} isErrorIconShown={false} />}
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          {...otherProps}
          id={id}
          className={`outline-none border-b border-b-grey pb-1 focus:border-b-black ${className}`}
          dir={isRTL ? "rtl" : "ltr"}
          autoComplete={autoComplete}
        />
        {errorMessage && <ErrorMessage className="mt-1 text-sm" message={errorMessage} isErrorIconShown={false} />}
      </div>
    );
  }
);

export default Input;
