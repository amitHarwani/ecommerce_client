import { useCallback, useEffect, useMemo, useState } from "react";
import ProductService from "../../../services/ProductService";
import { Product, Products } from "../../../services/product/ProductTypes";
import ProductsPage from "../presentation/ProductsPage";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ApiError from "../../../services/ApiError";
import { QUERY_PARAMS } from "../../../constants";

const ProductsPageContainer = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const categoryId = useMemo(() => {
    return searchParams.get(QUERY_PARAMS.category);
  }, [searchParams]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNumberToFetch, setPageNumberToFetch] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      setIsError(false);
      setIsLoading(true);

      let response: Products | ApiError;
      if (categoryId) {
        response = await ProductService.getProducts(pageNumber, categoryId);
      } else {
        response = await ProductService.getProducts(pageNumber);
      }

      setIsLoading(false);

      if (response instanceof Products) {
        if (response?.category?.name) {
          setCategoryName(response.category.name);
        }
        const productsList = response.products;
        setProducts((prev) => prev.concat(productsList));
        setTotalNumberOfPages(response.totalPages);
        setPageNumberToFetch((prev) => ++prev);
      } else {
        // Error
        setIsError(true);
      }
    },
    [categoryId]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  return (
    <ProductsPage
      heading={categoryId && categoryName ? categoryName : t("ourProducts")}
      products={products}
      error={isError ? true : false}
      loadMoreShown={pageNumberToFetch > totalNumberOfPages ? false : true}
      loadMore={() => fetchProducts(pageNumberToFetch)}
      isLoading={isLoading}
    />
  );
};

export default ProductsPageContainer;
