import { useEffect, useState } from "react";
import ExploreProductList from "../presentation/ExploreProductList";
import { Product } from "../../../../services/product/ProductTypes";
import ProductService from "../../../../services/product/ProductService";
import { EXPLORE_PRODUCTS_COUNT } from "../../../../data/applicationData";
import { ROUTE_PATHS } from "../../../../constants";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

const ExploreProductListContainer = () => {
  const navigate = useCustomNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const fetchFirstProductPage = async () => {
    const response = await ProductService.getTopProducts(EXPLORE_PRODUCTS_COUNT);

    if (response instanceof Array) {
      setProducts(response);
    } else {
      // Error here
      setIsError(true);
    }
  };

  /* navigate to /products */
  const viewAllClickHandler = () => {
    navigate(ROUTE_PATHS.products);
  }
  
  useEffect(() => {
    fetchFirstProductPage();
  }, []);
  return <ExploreProductList products={products} error={isError} viewAllClickHandler={viewAllClickHandler} />;
};

export default ExploreProductListContainer;
