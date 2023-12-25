import { useId } from "react";
import { useAppSelector } from "../../store";

interface InputProps {
  placeholder: string;
  type: string;
  className?: string;
}

const Input = (props: InputProps) => {
  const {
    placeholder = "",
    type = "text",
    className = "",
    ...otherProps
  } = props;

  const id = useId();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  if (type === "password") {
    return (
      <>
        <input
          placeholder={placeholder}
          type={type}
          {...otherProps}
          id={id}
          className={`outline-none border-b border-b-grey pb-1 focus:border-b-black ${className}`}
          dir={isRTL ? "rtl" : "ltr"}
        />
      </>
    );
  }
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        {...otherProps}
        id={id}
        className={`outline-none border-b border-b-grey pb-1 focus:border-b-black ${className}`}
        dir={isRTL ? "rtl" : "ltr"}
      />
    </>
  );
};

export default Input;
