import { useEffect, useState } from "react";
import CategoryList from "../presentation/CategoryList";
import { Category } from "../../../../services/category/CategoryTypes";
import CategoryService from "../../../../services/CategoryService";


const CategoryListContainer = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    const [isError, setIsError] = useState(false);

    const fetchAllCategories = () => {
        CategoryService.getAllCategoriesAsync((data, isDone, error) => {
            if(!error){
                setCategories((prev) => [...prev, ...data]);
            }
            else{
                console.error("Error -- fetchAllCategories()", error)
                setIsError(true);
            }
        })
    }

    useEffect(()=> {
        fetchAllCategories();
    }, [])
    return (
       <CategoryList categories={categories} error={isError}  />
    )
}

export default CategoryListContainer;