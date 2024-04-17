import { useCallback, useEffect, useState } from "react";
import ApiError from "../../../../services/ApiError";
import ProductService from "../../../../services/product/ProductService";
import { Product } from "../../../../services/product/ProductTypes";
import SearchProductList from "../presentation/SearchProductList";

interface SearchProductListContainerProps {
  productNameSearched: string;
}
const SearchProductListContainer = (props: SearchProductListContainerProps) => {
  const { productNameSearched } = props;

  /* Will store all the matching products */
  const [productsList, setProductsList] = useState<Array<Product>>([]);

  /* Will store the list of products shown */
  const [displayedProductsList, setDisplayedProductsList] = useState<
    Array<Product>
  >([]);

  const findProducts = useCallback(async () => {
    /* Resetting the list */
    setProductsList([]);
    setDisplayedProductsList([]);

    ProductService.getAllProductsAsync(
      (products: Array<Product>, _, error?: ApiError) => {
        if (!error) {
          /* Filtering according to the searched product name */
          const filteredProducts = products.filter((product) =>
            product.name
              ?.toLowerCase()
              ?.includes(productNameSearched?.toLowerCase())
          );

          /* Setting products list and displayed products list */
          setProductsList((prev) => {
            /* Updated products list */
            const updatedProductsList = [...prev, ...filteredProducts];
            /* Internal set state to avoid dependencies in useCallback */
            setDisplayedProductsList((prev) => {
              /* If there is space for more products to be shown */
              if (prev.length <= ProductService.defaultPageLimit) {
                /* slice from 0 to the page limit */
                prev = [
                  ...prev,
                  ...updatedProductsList.slice(
                    0,
                    ProductService.defaultPageLimit - prev.length
                  ),
                ];
              }
              return prev;
            });
            return updatedProductsList;
          });
        }
      }
    );
  }, [productNameSearched]);

  const loadMoreHandler = () => {
    /* Adding more products to displayed products list from the previously added once */
    setDisplayedProductsList((prev) => {
      return [
        ...prev,
        ...productsList.slice(prev.length, prev.length + ProductService.defaultPageLimit),
      ];
    });
  };

  useEffect(() => {
    findProducts();
  }, [findProducts]);

  return (
    <SearchProductList
      productList={displayedProductsList}
      loadMoreShown={displayedProductsList.length < productsList.length}
      loadMoreHandler={loadMoreHandler}
    />
  );
};

export default SearchProductListContainer;
