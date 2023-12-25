import ProductDetailsContainer from "../../../components/business/productdetails/container/ProductDetailsContainer";
import { Product } from "../../../services/product/ProductTypes";

interface ProductDetailPageProps {
  product: Product;
}
const ProductDetailPage = (props: ProductDetailPageProps) => {
  const { product } = props;

  return (
   <ProductDetailsContainer product={product} />
  );
};

export default ProductDetailPage;
