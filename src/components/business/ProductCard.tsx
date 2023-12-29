import { Product } from "../../services/product/ProductTypes";
import Image from "../basic/Image";
import { DEFAULT_CURRENCY } from "../../data/applicationData";
import { createSearchParams } from "react-router-dom";
import { PUBLIC_IMAGE_PATHS, QUERY_PARAMS, ROUTE_PATHS } from "../../constants";
import useCustomNavigate from "../../hooks/useCustomNavigate";

interface ProductCardProps {
  product: Product;
  className?: string;
  imageContainerClassName?: string;
}
const ProductCard = (props: ProductCardProps) => {
  const { product, className, imageContainerClassName } = props;

  const navigate = useCustomNavigate();

  /* navigate to /product/:productId */
  const productClickHandler = () => {
    navigate({
      pathname: ROUTE_PATHS.product,
      search: createSearchParams({ [QUERY_PARAMS.productId]: product._id, [QUERY_PARAMS.categoryId] : product.category })
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
            backupImageSrc={PUBLIC_IMAGE_PATHS.defaultProductImage}
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