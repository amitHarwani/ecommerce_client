import { RefObject, useCallback, useEffect, useState } from "react";
import LeftArrow from "../icons/LeftArrow";
import { useAppSelector } from "../../store";

interface CarouselButtons {
  scrollableElementRef: RefObject<HTMLDivElement>;
}
const CarouselButtons = (props: CarouselButtons) => {
  const { scrollableElementRef } = props;

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(true);

  /* Scroll to the right */
  const onNextClickHandler = () => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  /* Scroll to the left */
  const onBackClickHandler = () => {
    if (scrollableElementRef.current) {
      scrollableElementRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const onElementScroll = useCallback(() => {
    if (scrollableElementRef.current) {
      /* Checking if there is more scrollable width: Disbaling/Enabling Button based on it */
      const scrollWidth = scrollableElementRef.current.scrollWidth;
      const clientWidth = scrollableElementRef.current.clientWidth;
      const scrollLeft = Math.abs(scrollableElementRef.current.scrollLeft);

      if (scrollLeft === 0) {
        /* 0 Scrolled */
        setIsBackButtonDisabled(true);
        setIsNextButtonDisabled(false);
      } else if (scrollLeft + clientWidth === scrollWidth) {
        /* Fully Scrolled */
        setIsNextButtonDisabled(true);
        setIsBackButtonDisabled(false);
      } else {
        /* In between */
        setIsBackButtonDisabled(false);
        setIsNextButtonDisabled(false);
      }
    }
  }, [scrollableElementRef]);

  /* Listening for scroll event on the referenced element passed */
  useEffect(() => {
    const elementRef = scrollableElementRef.current;
    if (elementRef) {
      elementRef.addEventListener("scroll", onElementScroll);
    }
    return () => {
      elementRef?.removeEventListener("scroll", onElementScroll);
    };
  }, [scrollableElementRef, onElementScroll]);
  return (
    <div className={`flex justify-between`}>
      <button
        className="rounded-full bg-neutral-100 p-2 active:bg-darkRed active:text-zinc-50 active:disabled:bg-neutral-100 active:disabled:text-black"
        onClick={onBackClickHandler}
        disabled={isRTL ? isNextButtonDisabled : isBackButtonDisabled}
      >
        <LeftArrow className="w-4 h-4" />
      </button>
      <button
        className="rounded-full bg-neutral-100 p-2 ml-1 active:bg-darkRed active:text-zinc-50 active:disabled:bg-neutral-100 active:disabled:text-black"
        onClick={onNextClickHandler}
        disabled={isRTL ? isBackButtonDisabled : isNextButtonDisabled}
      >
        <LeftArrow className="w-4 h-4 rotate-180" />
      </button>
    </div>
  );
};

export default CarouselButtons;
