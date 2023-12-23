import { useTranslation } from "react-i18next";
import CardContainer from "../../../basic/CardContainer";
import { CARD_CONTAINER_OPTION } from "../../../../constants";
import { Product } from "../../../../services/product/ProductTypes";
import ErrorMessage from "../../../basic/ErrorMessage";
import ProductList from "../../../basic/ProductList";

interface ExploreProductListProps {
  products: Product[];
  error?: boolean;
}
const ExploreProductList = (props: ExploreProductListProps) => {
  const { products, error = false } = props;
  const { t } = useTranslation();
  return (
    <CardContainer
      heading={t("ourProducts")}
      subHeading={t("exploreOurProducts")}
      extraOption={CARD_CONTAINER_OPTION.BOTTOM_BUTTON}
      extraOptionButtonText={t("viewAllProducts")}
      extraOptionButtonClickHandler={() => {}}
    >
      {error ? (
        <ErrorMessage message={t("pleaseTryAgainLater")} className="justify-center"/>
      ) : (
        <ProductList products={products} className="mt-4" />
      )}
    </CardContainer>
  );
};

export default ExploreProductList;
