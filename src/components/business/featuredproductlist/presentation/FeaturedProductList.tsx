import { useTranslation } from "react-i18next";
import CardContainer from "../../../basic/CardContainer";
import { CARD_CONTAINER_OPTION } from "../../../../constants";
import { Product } from "../../../../services/product/ProductTypes";
import ErrorMessage from "../../../basic/ErrorMessage";
import ProductList from "../../../basic/ProductList";

interface FeaturedProductListProps {
  products: Product[];
  error?: boolean;
  viewAllClickHandler(): void;
}
const FeaturedProductList = (props: FeaturedProductListProps) => {
  const { products, error = false, viewAllClickHandler } = props;
  const { t } = useTranslation();
  return (
    <CardContainer
      heading={t("thisMonth")}
      subHeading={t("bestSellingProducts")}
      extraOption={CARD_CONTAINER_OPTION.RIGHT_BUTTON}
      extraOptionButtonText={t("viewAll")}
      extraOptionButtonClickHandler={viewAllClickHandler}
    >
      {error ? (
        <ErrorMessage message={t("pleaseTryAgainLater")} className="justify-center"/>
      ) : (
        <ProductList products={products} className="mt-4" />
      )}
    </CardContainer>
  );
};

export default FeaturedProductList;
