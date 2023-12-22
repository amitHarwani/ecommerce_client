import { useTranslation } from "react-i18next";
import CardContainer from "../../../basic/CardContainer";
import { CARD_CONTAINER_OPTION } from "../../../../constants";
import { category } from "../../../../services/category/CategoryTypes";
import CategoryCard from "../../../basic/CategoryCard";
import { RefObject, createRef, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../../../store";

interface CategoryList {
  categories: category[];
}
const CategoryList = (props: CategoryList) => {
  const { categories } = props;
  const { t } = useTranslation();


  const categoryContainerRef: RefObject<HTMLDivElement> = createRef();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  return (
    <CardContainer
      heading={t("categories")}
      subHeading={t("browseByCategory")}
      extraOption={CARD_CONTAINER_OPTION.CAROUSEL}
      carouselScrollableElementRef = {categoryContainerRef}
    >
      <div
        className="flex overflow-auto no-scrollbar mt-4"
        ref={categoryContainerRef}
        dir={isRTL ? 'rtl': 'ltr'}
      >
        {categories.map((category) => (
          <div key={category._id} className="mr-4 p-1">
            <CategoryCard category={category} className="w-40 h-36" />
          </div>
        ))}
      </div>
    </CardContainer>
  );
};

export default CategoryList;
