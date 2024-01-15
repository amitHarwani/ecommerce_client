import { useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductService from "../../../../services/product/ProductService";
import FeaturedProductList from "../presentation/FeaturedProductList";
import { FEATURED_PRODUCTS_COUNT } from "../../../../data/applicationData";
import { ROUTE_PATHS } from "../../../../constants";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

const FeaturedProductListContainer = () => {
  
  const navigate = useCustomNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const fetchFeaturedProducts = async () => {
    const response = await ProductService.getTopOnSaleProducts(FEATURED_PRODUCTS_COUNT);

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
    fetchFeaturedProducts();
  }, []);
  return <FeaturedProductList products={products} error={isError} viewAllClickHandler={viewAllClickHandler}/>;
};

export default FeaturedProductListContainer;
