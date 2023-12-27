import { useCallback, useEffect, useState } from "react";
import AllProductList from "../presentation/AllProductList";
import { Product, Products } from "../../../../services/product/ProductTypes";
import ApiError from "../../../../services/ApiError";
import ProductService from "../../../../services/ProductService";
import { useTranslation } from "react-i18next";

interface AllProductListContainerProps {
  categoryId?: string;
}
const AllProductListContainer = (props: AllProductListContainerProps) => {
  const { categoryId = "" } = props;

  const { t } = useTranslation();

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
    <AllProductList
      heading={categoryId && categoryName ? categoryName : t("ourProducts")}
      products={products}
      error={isError ? true : false}
      loadMoreShown={pageNumberToFetch > totalNumberOfPages ? false : true}
      loadMore={() => fetchProducts(pageNumberToFetch)}
      isLoading={isLoading}
    />
  );
};

export default AllProductListContainer;
