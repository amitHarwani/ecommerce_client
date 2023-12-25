import { useSearchParams } from "react-router-dom";
import ProductDetailPage from "../presentation/ProductDetailPage";
import { QUERY_PARAMS } from "../../../constants";
import ProductService from "../../../services/ProductService";
import ApiError from "../../../services/ApiError";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../../services/product/ProductTypes";
import { RELATED_PRODUCTS_COUNT } from "../../../data/applicationData";

const ProductDetailPageContainer = () => {
  const [searchParams] = useSearchParams();

  const productId = useMemo(() => {
    return searchParams.get(QUERY_PARAMS.productId);
  }, [searchParams]);

  const [productDetails, setProductDetails] = useState<Product>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  /* Error while fetching product details */
  const [isProductDetailsError, setIsProductDetailsError] = useState(false);

  /* Error while fetching related items */
  const [isRelatedItemsError, setIsRelatedItemsError] = useState(false);

  const fetchRelatedProducts = useCallback(async (categoryId: string) => {
    setIsProductDetailsError(false);
    const response = await ProductService.getRelatedProducts(
      categoryId,
      RELATED_PRODUCTS_COUNT
    );

    if (response instanceof ApiError) {
      // Error
      setIsProductDetailsError(true);
    } else {
      setRelatedProducts(response);
    }
  }, []);

  const fetchProductDetails = useCallback(async () => {
    if (productId) {
      setIsRelatedItemsError(false);
      const response = await ProductService.getProduct(productId);

      if (response instanceof ApiError) {
        // Error
        setIsRelatedItemsError(true);
      } else {
        fetchRelatedProducts(response.category);
        setProductDetails(response);
      }
    }
  }, [productId, fetchRelatedProducts]);

  const addToCart = (product: Product, quantity: number) => {

  }

  const removeFromCart = (product: Product) => {
    
  }

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
    <>
      <ProductDetailPage
        product={productDetails}
        relatedProducts={relatedProducts}
        isProductDetailsError={isProductDetailsError}
        isRelatedItemsError={isRelatedItemsError}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </>
  );
};

export default ProductDetailPageContainer;
