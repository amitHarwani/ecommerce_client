import { useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductService from "../../../../services/ProductService";
import FeaturedProductList from "../presentation/FeaturedProductList";
import { FEATURED_PRODUCTS_COUNT } from "../../../../data/applicationData";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../../constants";

const FeaturedProductListContainer = () => {
  
  const navigate = useNavigate();

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
