import { useTranslation } from "react-i18next";
import { Product } from "../../../../services/product/ProductTypes";
import CardContainer from "../../../business/CardContainer";
import { CARD_CONTAINER_OPTION } from "../../../../constants";
import ProductList from "../../../business/ProductList";
import ErrorMessage from "../../../basic/ErrorMessage";

interface SearchProductListProps {
  productList: Array<Product>;
  loadMoreShown: boolean;
  loadMoreHandler(): void;
}
const SearchProductList = (props: SearchProductListProps) => {
  const { productList, loadMoreShown, loadMoreHandler } = props;

  const { t } = useTranslation();
  return (
    <>
      <CardContainer
        heading={t("searchResults")}
        extraOption={
          loadMoreShown ? CARD_CONTAINER_OPTION.BOTTOM_BUTTON : undefined
        }
        extraOptionButtonText={t("loadMore")}
        extraOptionButtonClickHandler={loadMoreHandler}
      >
        <>
        {
          !productList?.length ? 
          <ErrorMessage message={t("noResultsFound")} className="justify-center mt-4" />
          :
          <ProductList products={productList} className="mt-4" />
        }
        </>
      </CardContainer>
    </>
  );
};

export default SearchProductList;
