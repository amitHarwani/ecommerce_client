import { useTranslation } from "react-i18next";
import { Product } from "../../services/product/ProductTypes";
import Image from "./Image";
import { DEFAULT_CURRENCY } from "../../data/applicationData";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  className?: string;
  imageContainerClassName?: string
}
const ProductCard = (props: ProductCardProps) => {
  const { product, className, imageContainerClassName } = props;


  return (
    <div className={`flex flex-col transition transform hover:scale-105 active:scale-95 cursor-pointer ${className}`} onClick={() => {}}>
      <>
      <div className={`flex flex-col items-center bg-neutral-100 rounded relative ${imageContainerClassName}`}>
        <Image src={product.mainImage.url} alt={product.name} backupImageSrc={"images/defaultproduct.png"} className="h-full rounded" />
      
      </div>

      <div className="mt-2">
        <div className="text-black font-poppinsMedium capitalize truncate" >
          {product.name}
        </div>
        <div className={`flex`}>
          <span className="text-darkRed font-poppinsMedium">
            {product.currency || DEFAULT_CURRENCY} {product.price}
          </span>
          {product.previousPrice && (
            <span className={`font-poppinsMedium text-neutral-500 line-through ml-2`}>
              {product.previousPrice}
            </span>
          )}
        </div>
      </div>
      </>
    </div>
  );
};

export default ProductCard;
