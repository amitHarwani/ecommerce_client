import { useEffect, useState } from "react";
import ExploreProductList from "../presentation/ExploreProductList";
import { Product } from "../../../../services/product/ProductTypes";
import ProductService from "../../../../services/ProductService";
import { EXPLORE_PRODUCTS_COUNT } from "../../../../data/applicationData";

const ExploreProductListContainer = () => {
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

  useEffect(() => {
    fetchFirstProductPage();
  }, []);
  return <ExploreProductList products={products} error={isError} />;
};

export default ExploreProductListContainer;
