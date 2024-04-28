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


  /* Initial Render */
  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <CategoriesTable 
        categories={categories}
        isError={isError}
      />
    </>
  );
};

export default CategoriesTableContainer;
