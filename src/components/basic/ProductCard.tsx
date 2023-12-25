import { Product } from "../../services/product/ProductTypes";
import Image from "./Image";
import { DEFAULT_CURRENCY } from "../../data/applicationData";
import { createSearchParams, useNavigate } from "react-router-dom";
import { QUERY_PARAMS, ROUTE_PATHS } from "../../constants";

interface ProductCardProps {
  product: Product;
  className?: string;
  imageContainerClassName?: string;
}
const ProductCard = (props: ProductCardProps) => {
  const { product, className, imageContainerClassName } = props;

  const navigate = useNavigate();

  /* navigate to /product/:productId */
  const productClickHandler = () => {
    navigate({
      pathname: ROUTE_PATHS.product,
      search: createSearchParams({ [QUERY_PARAMS.productId]: product._id })
        .toString()
    });
  };
  return (
    <div
      className={`flex flex-col transition transform hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      onClick={productClickHandler}
    >
      <>
        <div
          className={`flex flex-col items-center bg-neutral-100 rounded relative ${imageContainerClassName}`}
        >
          <Image
            src={product.mainImage.url}
            alt={product.name}
            backupImageSrc={"images/defaultproduct.png"}
            className="h-full w-full rounded"
          />
        </div>

        <div className="mt-2">
          <div className="text-black font-poppinsMedium capitalize truncate">
            {product.name}
          </div>
          <div className={`flex`}>
            <span className="text-darkRed font-poppinsMedium">
              {product.currency || DEFAULT_CURRENCY} {product.price}
            </span>
            {product.previousPrice && (
              <span
                className={`font-poppinsMedium text-neutral-500 line-through ml-2`}
              >
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
