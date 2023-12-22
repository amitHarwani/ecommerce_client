import { useEffect, useState } from "react";
import CategoryList from "../presentation/CategoryList";
import { category } from "../../../../services/category/CategoryTypes";
import CategoryService from "../../../../services/CategoryService";


const CategoryListContainer = () => {

    const [categories, setCategories] = useState<category[]>([]);

    const fetchAllCategories = () => {
        CategoryService.getAllCategoriesAsync((data, isDone, error) => {
            if(!error){
                setCategories((prev) => [...prev, ...data]);
            }
        })
    }

    useEffect(()=> {
        fetchAllCategories();
    }, [])
    return (
       <CategoryList categories={categories}  />
    )
}

export default CategoryListContainer;