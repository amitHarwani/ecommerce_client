import { useEffect, useMemo, useState } from "react";
import AddIcon from "../icons/AddIcon";
import SubtractIcon from "../icons/SubtractIcon";
import { useAppSelector } from "../../store";

interface QuantityCounterProps {
  defaultQuantity: number;
  onQuantityChanged(quantity: number): void;
  maxLimit?: number;
  className?: string;
  textClassName?: string;
}
const QuantityCounter = (props: QuantityCounterProps) => {
  const {
    defaultQuantity,
    onQuantityChanged,
    className = "",
    textClassName = "",
    maxLimit = Infinity,
  } = props;

  const isRTL = useAppSelector(state => state.language.isRTL);
  const [quantity, setQuantity] = useState(defaultQuantity);

  const textStyles = useMemo(() => {
    if(textClassName){
      return textClassName;
    }
    return 'text-lg font-poppinsMedium'
  }, [textClassName])

  useEffect(() => {
    setQuantity(defaultQuantity);
  }, [defaultQuantity]);

  const addQuantity = () => {
    setQuantity((prev) => {
      prev++;
      return prev;
    });
  };
  const subtractQuantity = () => {
    setQuantity((prev) => {
      if (prev !== 1) {
        prev--;
        return prev;
      }
      return prev;
    });
  };

  useEffect(() => {
    onQuantityChanged(quantity);
  }, [quantity, onQuantityChanged]);

  return (
    <div className={`flex ${isRTL ? 'flex-row-reverse': ''} ${className}`}>
      <button
        className={`w-1/4 bg-white border-2 border-grey flex justify-center items-center py-2 ${isRTL ? 'border-l-0 rounded-r' : 'border-r-0 rounded-l'}`}
        onClick={subtractQuantity}
      >
        <SubtractIcon className="w-4 h-4 text-black" />
      </button>
      <span
        className={`w-2/4 flex justify-center items-center border-2 border-grey  ${isRTL ? 'border-l-0' : 'border-r-0'} ${textStyles}`}
      >
        {quantity}
      </span>
      <button
        className={`w-1/4 bg-darkRed border-2 border-darkRed flex justify-center items-center ${isRTL ? 'rounded-l' : 'rounded-r'}`}
        onClick={addQuantity}
        disabled={quantity >= maxLimit}
      >
        <AddIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default QuantityCounter;
