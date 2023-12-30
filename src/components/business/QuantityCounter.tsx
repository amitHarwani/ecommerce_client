import { useEffect, useState } from "react";
import AddIcon from "../icons/AddIcon";
import SubtractIcon from "../icons/SubtractIcon";

interface QuantityCounterProps {
  defaultQuantity: number;
  onQuantityChanged(quantity: number): void;
  maxLimit?: number;
  className?: string;
}
const QuantityCounter = (props: QuantityCounterProps) => {
  const { defaultQuantity, onQuantityChanged, className = '', maxLimit = Infinity } = props;

  const [quantity, setQuantity] = useState(defaultQuantity);

  useEffect(() => {
    setQuantity(defaultQuantity);
  }, [defaultQuantity])

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
  }, [quantity, onQuantityChanged])

  return (
    <div className={`flex ${className}`}>
      <button
        className="w-1/4 bg-white border-2 border-grey border-r-0 flex justify-center items-center rounded-l py-2"
        onClick={subtractQuantity}
      >
        <SubtractIcon className="w-4 h-4 text-black" />
      </button>
      <span className="w-2/4 text-lg font-poppinsMedium flex justify-center items-center border-2 border-grey border-r-0">
        {quantity}
      </span>
      <button
        className="w-1/4 bg-darkRed border-2 border-darkRed flex justify-center items-center rounded-r"
        onClick={addQuantity}
        disabled={quantity >=  maxLimit}
      >
        <AddIcon className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default QuantityCounter;
