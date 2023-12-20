import { RefObject, useCallback, useEffect, useState } from "react";

const useOutsideClick = (ref: RefObject<HTMLElement>) => {
  const [clickedOutside, setClickedOutside] = useState(0);

  const checkOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (ref?.current && !ref?.current?.contains(event?.target)) {
        setClickedOutside((prev) => ++prev);
      }
    },
    [ref]
  );


  useEffect(() => {
    window.addEventListener("mousedown", checkOutsideClick);

    return () => {
      window.removeEventListener("mousedown", checkOutsideClick);
    };
  }, [ref, checkOutsideClick]);

  return [clickedOutside];
};

export default useOutsideClick;
