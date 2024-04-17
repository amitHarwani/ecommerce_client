import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ProductService from "../../../../services/product/ProductService";
import { Product } from "../../../../services/product/ProductTypes";
import AllProductList from "../presentation/AllProductList";

interface AllProductListContainerProps {
  categoryId?: string;
}
const AllProductListContainer = (props: AllProductListContainerProps) => {
  const { categoryId = "" } = props;

  const { t } = useTranslation();

  /* Loading flag */
  const [isLoading, setIsLoading] = useState(false);

  /* Error flag: When fetching products */
  const [isError, setIsError] = useState(false);

  /* Products List */
  const [products, setProducts] = useState<Product[]>([]);

  /* Displayed Products List */
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  /* Category name if categoryId is passed */
  const [categoryName, setCategoryName] = useState("");

  /* Flag to store when data fetching has started*/
  const isFetchingDataStarted = useRef(false);

  const fetchProducts = useCallback(async () => {
    /* Data fetching has started */
    isFetchingDataStarted.current = true;

    /* Hiding error, Displaying loading spinner */
    setIsError(false);
    setIsLoading(true);
    setProducts([]);

    /* Used to set displayed products list on first response */
    let isFirstResponse = true;

    ProductService.getAllProductsAsync((data, _, error, categoryInfo) => {
      if (!error) {
        /* Set overall products list */
        setProducts((prev) => [...prev, ...data]);

        /* On first response, set displayed products list, category name and hide loading spinner */
        if (isFirstResponse) {
          if (!displayedProducts.length) {
            setDisplayedProducts(data);
          }
          if (categoryInfo) {
            setCategoryName(categoryInfo.name);
          }
          setIsLoading(false);
        }
      } else {
        setIsError(true);
        setProducts([]);
      }
      isFirstResponse = false;
    }, categoryId);

    /* Hide Loading spinner */
    setIsLoading(false);
  }, [categoryId, displayedProducts]);

  /* Load more handler */
  const loadMoreHandler = () => {
    /**
     * Append to displayed products list from the end of products list + the default page limit
     */
    setDisplayedProducts((prev) => [
      ...prev,
      ...products.slice(
        prev.length,
        prev.length + ProductService.defaultPageLimit
      ),
    ]);
  };
  useEffect(() => {
    if (!isFetchingDataStarted.current) {
      fetchProducts();
    }
  }, [fetchProducts]);

  return (
    <AllProductList
      heading={categoryId && categoryName ? categoryName : t("ourProducts")}
      products={displayedProducts}
      error={isError ? true : false}
      loadMoreShown={products.length > displayedProducts.length ? true : false}
      loadMore={loadMoreHandler}
      isLoading={isLoading}
    />
  );
};

export default AllProductListContainer;
