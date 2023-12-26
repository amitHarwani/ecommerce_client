import { useTranslation } from "react-i18next";
import { Product } from "../../../../services/product/ProductTypes";
import CardContainer from "../../../business/CardContainer";
import ProductList from "../../../business/ProductList";
import ErrorMessage from "../../../basic/ErrorMessage";
import { CARD_CONTAINER_OPTION } from "../../../../constants";

interface AllProductListProps {
  products: Product[];
  heading: string;
  error?: boolean;
  isLoading?: boolean;
  loadMoreShown: boolean;
  loadMore(): void;
}
const AllProductList = (props: AllProductListProps) => {
  const {
    products,
    heading,
    error = false,
    isLoading = false,
    loadMoreShown = true,
    loadMore,
  } = props;

  const { t } = useTranslation();

  return (
    <CardContainer
      heading={heading}
      extraOption={
        loadMoreShown ? CARD_CONTAINER_OPTION.BOTTOM_BUTTON : undefined
      }
      extraOptionButtonText={t("loadMore")}
      extraOptionButtonClickHandler={loadMore}
      isLoadingButton={isLoading}
    >
      <>
        <ProductList products={products} className="mt-4" />
        {error && (
          <ErrorMessage
            message={t("pleaseTryAgainLater")}
            className="justify-center"
          />
        )}
      </>
    </CardContainer>
  );
};

export default AllProductList;
