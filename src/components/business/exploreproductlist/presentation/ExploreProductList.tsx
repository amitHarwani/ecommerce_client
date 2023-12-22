import { useTranslation } from "react-i18next";
import CardContainer from "../../../basic/CardContainer";
import { CARD_CONTAINER_OPTION } from "../../../../constants";
import { Product } from "../../../../services/product/ProductTypes";
import ProductCard from "../../../basic/ProductCard";
import ErrorMessage from "../../../basic/ErrorMessage";

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-0 gap-y-4 mt-4">
          {products.map((product) => (
            <div key={product._id} className="">
              <ProductCard
                product={product}
                className="max-w-xs "
                imageContainerClassName="h-56 lg:h-80"
              />
            </div>
          ))}
        </div>
      )}
    </CardContainer>
  );
};

export default ExploreProductList;
