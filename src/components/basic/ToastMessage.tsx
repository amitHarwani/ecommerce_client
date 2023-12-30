import { useMemo } from "react";
import { TOAST_MESSAGE_TYPES } from "../../constants";
import { useAppSelector } from "../../store";
import ErrorIcon from "../icons/ErrorIcon";
import TickIcon from "../icons/TickIcon";

interface ToastMessageProps {
  className?: string;
}
const ToastMessage = (props: ToastMessageProps) => {
  const { className } = props;
  const message = useAppSelector((state) => state.toastMessage);

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const isSuccessMessage = useMemo(() => {
    if (message.type === TOAST_MESSAGE_TYPES.success) {
      return true;
    }
    return false;
  }, [message]);
  return (
    <>
      {message.type && (
        <div
          className={`z-20 fixed top-20 flex justify-center items-center w-full ${className}`}
        >
          <div
            className={`flex items-center justify-between px-14 py-2 gap-x-2 shadow-xl rounded ${
              isRTL ? "flex-row-reverse" : ""
            } 
              bg-[#dbd7d7]
            `}
          >
            {isSuccessMessage ? (
              <TickIcon
                className="w-4 h-4 text-zinc-50"
                circleProps={{
                  className: "fill-green-700",
                  cx: 25,
                  cy: 25,
                  r: 25,
                }}
              />
            ) : (
              <ErrorIcon className="w-4 h-4 text-darkRed" />
            )}
            <span className="capitalize text-sm">{message.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastMessage;
