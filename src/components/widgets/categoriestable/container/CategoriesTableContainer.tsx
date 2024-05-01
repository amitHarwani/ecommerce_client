import { useEffect, useState } from "react";
import CategoryService from "../../../../services/category/CategoryService";
import CategoriesTable from "../presentation/CategoriesTable";
import { Category } from "../../../../services/category/CategoryTypes";

const CategoriesTableContainer = () => {
  /* List of all categories */
  const [categories, setCategories] = useState<Category[]>([]);

  /* To know if an error has occurred when fetching categories */
  const [isError, setIsError] = useState(false);

  /* Fetch All Categories Asynchronously */
  const fetchAllCategories = () => {
    CategoryService.getAllCategoriesAsync((data, _, error) => {
      if (!error) {
        setCategories((prev) => [...prev, ...data]);
      } else {
        console.error("Error -- fetchAllCategories()", error);
        setIsError(true);
      }
    });
  };

  /* Once a category has been updated or added (In order to avoid another apiCall) */
  const onCategoryAddedOrUpdatedHandler = (
    newCategory: Category,
    selectedCategoryIndex: number
  ) => {
    console.log("onCategoryAddedOrUpdatedHandler", "selectedCategoryIndex", selectedCategoryIndex);
    if (selectedCategoryIndex !== -1) {
      /* Update category at selectedCategoryIndex */
      setCategories((prev) => {
        prev[selectedCategoryIndex] = { ...newCategory };
        return [...prev];
      });
    } else {
      /* Inserting it at the top */
      setCategories((prev) => {
        prev.unshift(newCategory);
        return [...prev];
      });
    }
  };

  console.log("Categories Table Container", categories);

  const onCategoryDeletedHandler = (categoryIndex: number) => {
    setCategories((prev) => {
      prev.splice(categoryIndex, 1);
      return [...prev];
    })
  }

  /* Initial Render */
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <CategoriesTable
        categories={categories}
        isError={isError}
        onCategoryAddedOrUpdatedHandler={onCategoryAddedOrUpdatedHandler}
        onCategoryDeletedHandler={onCategoryDeletedHandler}
      />
    </>
  );
};

export default CategoriesTableContainer;
