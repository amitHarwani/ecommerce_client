import { useCallback, useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductDetails from "../presentation/ProductDetails";
import ProductService from "../../../../services/ProductService";
import ApiError from "../../../../services/ApiError";

interface ProductDetailsContainerProps {
  productId: string;
}
const ProductDetailsContainer = (props: ProductDetailsContainerProps) => {
  const { productId } = props;

  const [productDetails, setProductDetails] = useState<Product>();

  /* Error while fetching product details */
  const [isProductDetailsError, setIsProductDetailsError] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    if (productId) {
      setIsProductDetailsError(false);

      const response = await ProductService.getProduct(productId);

      if (response instanceof ApiError) {
        // Error
        setIsProductDetailsError(true);
      } else {
        setIsProductDetailsError(false);
        setProductDetails(response);
      }
    }
  }, [productId]);

  const addToCart = (product: Product, quantity: number) => {};

  const removeFromCart = (product: Product) => {};

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
    <ProductDetails
      product={productDetails}
      isError={isProductDetailsError}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
    />
  );
};

export default ProductDetailsContainer;
