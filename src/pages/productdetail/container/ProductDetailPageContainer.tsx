import { useSearchParams } from "react-router-dom";
import ProductDetailPage from "../presentation/ProductDetailPage";
import { QUERY_PARAMS } from "../../../constants";
import { useMemo } from "react";

const ProductDetailPageContainer = () => {
  const [searchParams] = useSearchParams();

  const productId = useMemo(() => {
    return searchParams.get(QUERY_PARAMS.productId);
  }, [searchParams]);

  const categoryId = useMemo(() => {
    return searchParams.get(QUERY_PARAMS.categoryId);
  }, [searchParams]);
  return (
    <>
      <ProductDetailPage
        productId={productId ? productId : ""}
        categoryId={categoryId ? categoryId : ""}
      />
    </>
  );
};

export default ProductDetailPageContainer;
