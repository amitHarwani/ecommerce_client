import { useTranslation } from "react-i18next";
import CardContainer from "../../../components/basic/CardContainer";
import ProductList from "../../../components/basic/ProductList";
import { CARD_CONTAINER_OPTION } from "../../../constants";
import { Product } from "../../../services/product/ProductTypes";
import ErrorMessage from "../../../components/basic/ErrorMessage";

interface ProductsPageProps {
  products: Product[];
  heading: string;
  error?: boolean;
  isLoading?: boolean;
  loadMoreShown: boolean;
  loadMore(): void;
}
const ProductsPage = (props: ProductsPageProps) => {
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
    <div className="px-2 py-4 lg:px-10">
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
    </div>
  );
};

export default ProductsPage;
