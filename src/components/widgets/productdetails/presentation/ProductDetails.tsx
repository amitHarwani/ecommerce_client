import { useMemo, useState } from "react";
import { DEFAULT_CURRENCY } from "../../../../data/applicationData";
import { Product } from "../../../../services/product/ProductTypes";
import ProductImagesView from "../../../business/ProductImagesView";
import { useTranslation } from "react-i18next";
import QuantityCounter from "../../../business/QuantityCounter";
import Button from "../../../basic/Button";
import { ButtonTypes } from "../../../../constants";
import { useAppSelector } from "../../../../store";
import ErrorMessage from "../../../basic/ErrorMessage";

interface ProductDetailsProps {
  product?: Product;
  isError?: boolean;
  addToCart(product: Product, quantity: number): void;
  removeFromCart(product: Product): void;
}
const ProductDetails = (props: ProductDetailsProps) => {
  const { product, isError = false, addToCart, removeFromCart } = props;

  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  const [quantity, setQuantity] = useState(1);

  const isInStock = useMemo(() => {
    if (product) {
      if (product.stock > 0) {
        return true;
      }
      return false;
    }
  }, [product]);

  return (
    <>
      {!product || isError ? (
        <ErrorMessage
          message={t("pleaseTryAgainLater")}
          className="justify-center"
        />
      ) : (
        <div
          className={`flex flex-col gap-y-4 lg:gap-x-16 ${
            isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <ProductImagesView
            productName={product.name}
            mainImage={product.mainImage}
            subImages={product.subImages}
            className="lg:w-3/5 lg:h-[550px] gap-y-2 lg:gap-y-0 lg:gap-x-4"
          />
          <div className="flex flex-col lg:w-2/5">
            <div className="flex flex-col border-b-2 border-b-grey pb-6">
              <span className="font-semibold text-2xl tracking-wider">
                {product.name}
              </span>

              <span
                className={`capitalize mt-2 font-poppinsMedium ${
                  isInStock ? "text-green-500" : "text-darkRed"
                }`}
              >
                {isInStock ? t("inStock") : t("outOfStock")}
              </span>

              <span className="mt-2 text-2xl tracking-wider">
                {product.currency || DEFAULT_CURRENCY} {product.price}
              </span>

              <span className="text-sm mt-4">{product.description}</span>
            </div>
            <div
              className={`flex flex-col gap-y-6 lg:gap-x-2 mt-16 ${
                isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              <QuantityCounter
                defaultQuantity={quantity}
                onQuantityChanged={(newQuantity) => {
                  setQuantity(newQuantity);
                }}
                className="flex-1"
              />
              <Button
                buttonType={ButtonTypes.primaryButton}
                className="flex-1 px-4 py-3 lg:p-0"
                onClickHandler={() => {
                  addToCart(product, quantity);
                }}
              >
                <span className="uppercase">{t("addToCart")}</span>
              </Button>
              <Button
                buttonType={ButtonTypes.secondaryButton}
                className="flex-1 px-4 py-3 lg:p-0"
                onClickHandler={() => {
                  removeFromCart(product);
                }}
              >
                <span className="uppercase">{t("removeFromCart")}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
