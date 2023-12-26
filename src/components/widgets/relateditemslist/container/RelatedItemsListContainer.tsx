import { useCallback, useEffect, useState } from "react";
import ProductService from "../../../../services/ProductService";
import { Product } from "../../../../services/product/ProductTypes";
import RelatedItemsList from "../presentation/RelatedItemsList";
import { RELATED_PRODUCTS_COUNT } from "../../../../data/applicationData";
import ApiError from "../../../../services/ApiError";

interface RelatedItemsListContainerProps {
  productId: string;
  categoryId: string;
}
const RelatedItemsListContainer = (props: RelatedItemsListContainerProps) => {
  const { categoryId } = props;

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  /* Error while fetching related items */
  const [isRelatedItemsError, setIsRelatedItemsError] = useState(false);

  const fetchRelatedProducts = useCallback(async () => {
    setIsRelatedItemsError(false);
    const response = await ProductService.getRelatedProducts(
      categoryId,
      RELATED_PRODUCTS_COUNT
    );

    if (response instanceof ApiError) {
      // Error
      setIsRelatedItemsError(true);
    } else {
      setIsRelatedItemsError(false);

      setRelatedProducts(response);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchRelatedProducts();
  }, [fetchRelatedProducts]);

  return <RelatedItemsList relatedProducts={relatedProducts} isError={isRelatedItemsError} />;
};

export default RelatedItemsListContainer;
