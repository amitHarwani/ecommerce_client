import { useCallback, useEffect, useState } from "react";
import AllProductList from "../presentation/AllProductList";
import { Product, Products } from "../../../../services/product/ProductTypes";
import ApiError from "../../../../services/ApiError";
import ProductService from "../../../../services/product/ProductService";
import { useTranslation } from "react-i18next";

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

  /* Page number which needs to be fetched next */
  const [pageNumberToFetch, setPageNumberToFetch] = useState(1);

  /* Total number of pages  */
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);

  /* Products List */
  const [products, setProducts] = useState<Product[]>([]);

  /* Category name if categoryId is passed */
  const [categoryName, setCategoryName] = useState("");

  const fetchProducts = useCallback(
    async (pageNumber: number) => {
      /* Hiding error, Displaying loading spinner */
      setIsError(false);
      setIsLoading(true);

      let response: Products | ApiError;
      if (categoryId) {
        response = await ProductService.getProducts(pageNumber, categoryId);
      } else {
        response = await ProductService.getProducts(pageNumber);
      }

      /* Hide Loading spinner */
      setIsLoading(false);

      if (response instanceof Products) {
        /* If products are fetched by category, 
           a category object exists in the response which contains the category name 
        */
        if (response?.category?.name) {
          setCategoryName(response.category.name);
        }

        /* Setting the products list state */
        const productsList = response.products;
        setProducts((prev) => prev.concat(productsList));

        /* Setting total number of pages, incrementing page number to fetch */
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
