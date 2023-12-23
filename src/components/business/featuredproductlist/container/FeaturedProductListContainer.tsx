import { useEffect, useState } from "react";
import { Product } from "../../../../services/product/ProductTypes";
import ProductService from "../../../../services/ProductService";
import FeaturedProductList from "../presentation/FeaturedProductList";
import { FEATURED_PRODUCTS_COUNT } from "../../../../data/applicationData";

const FeaturedProductListContainer = () => {
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

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return <FeaturedProductList products={products} error={isError} />;
};

export default FeaturedProductListContainer;
