import { useEffect, useState } from "react";
import CategoryList from "../presentation/CategoryList";
import { Category } from "../../../../services/category/CategoryTypes";
import CategoryService from "../../../../services/CategoryService";
import { createSearchParams } from "react-router-dom";
import { QUERY_PARAMS, ROUTE_PATHS } from "../../../../constants";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";

const CategoryListContainer = () => {
  const navigate = useCustomNavigate();

  const [categories, setCategories] = useState<Category[]>([]);

  const [isError, setIsError] = useState(false);

  const fetchAllCategories = () => {
    CategoryService.getAllCategoriesAsync((data, isDone, error) => {
      if (!error) {
        setCategories((prev) => [...prev, ...data]);
      } else {
        console.error("Error -- fetchAllCategories()", error);
        setIsError(true);
      }
    });
  };

  /* navigate to /products?category=<categoryId> */
  const categoryClickHandler = (category: Category) => {
    navigate({
      pathname: ROUTE_PATHS.products,
      search: createSearchParams({
        [QUERY_PARAMS.category]: category._id,
      }).toString(),
    });
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <CategoryList
      categories={categories}
      error={isError}
      categoryClickHandler={categoryClickHandler}
    />
  );
};

export default CategoryListContainer;
