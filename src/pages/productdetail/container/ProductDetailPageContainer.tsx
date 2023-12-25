import { useSearchParams } from "react-router-dom";
import ProductDetailPage from "../presentation/ProductDetailPage";
import { QUERY_PARAMS } from "../../../constants";
import ProductService from "../../../services/ProductService";
import ApiError from "../../../services/ApiError";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../../services/product/ProductTypes";

const ProductDetailPageContainer = () => {
  const [searchParams] = useSearchParams();

  const productId = useMemo(() => {
    return searchParams.get(QUERY_PARAMS.productId);
  }, [searchParams])

  const [productDetails, setProductDetails] = useState<Product>();

  const fetchProductDetails = useCallback(async () => {
    if (productId) {
      const response = await ProductService.getProduct(productId);

      if (response instanceof ApiError) {
        // Error Here
      } else {
        setProductDetails(response);
      }
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
    <>
      {productDetails && <ProductDetailPage product={productDetails} />}
    </>
  );
};

export default ProductDetailPageContainer;
