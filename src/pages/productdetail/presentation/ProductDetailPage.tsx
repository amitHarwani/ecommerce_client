import { useTranslation } from "react-i18next";
import CardContainer from "../../../components/basic/CardContainer";
import ProductList from "../../../components/basic/ProductList";
import ProductDetailsContainer from "../../../components/business/productdetails/container/ProductDetailsContainer";
import { Product } from "../../../services/product/ProductTypes";
import ErrorMessage from "../../../components/basic/ErrorMessage";

interface ProductDetailPageProps {
  product?: Product;
  relatedProducts: Product[];
  isProductDetailsError: boolean;
  isRelatedItemsError: boolean;
  addToCart(product: Product, quantity: number): void;
  removeFromCart(product: Product): void;
}
const ProductDetailPage = (props: ProductDetailPageProps) => {
  const {
    product,
    relatedProducts,
    isProductDetailsError,
    isRelatedItemsError,
    addToCart,
    removeFromCart
  } = props;

  const { t } = useTranslation();
  return (
    <div className="px-2 py-4 lg:px-10">
      {isProductDetailsError || !product ? (
        <ErrorMessage message={t("pleaseTryAgainLater")} className="justify-center" />
      ) : (
        <ProductDetailsContainer product={product} addToCart={addToCart} removeFromCart={removeFromCart} />
      )}

      <div className="mt-32">
        <CardContainer heading={t("relatedItems")}>
          {isRelatedItemsError ? (
            <ErrorMessage message={t("pleaseTryAgainLater")} className="justify-center mt-4" />
          ) : (
            <ProductList products={relatedProducts} className="mt-4" />
          )}
        </CardContainer>
      </div>
    </div>
  );
};

export default ProductDetailPage;
