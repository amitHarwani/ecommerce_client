import { CATEGORY_ICONS } from "../../data/applicationData";
import { category } from "../../services/category/CategoryTypes";
import GeneralCategoryIcon from "../icons/GeneralCategoryIcon";
import Button from "./Button";

interface CategoryProps {
  category: category;
  className?: string;
}
const CategoryCard = (props: CategoryProps) => {
  const { category, className = '' } = props;
  return (
    <Button
      className={`flex flex-col border-2 border-grey rounded items-center justify-around px-12 py-6 text-black active:bg-darkRed  active:text-zinc-50 ${className}`}
      onClickHandler={() => {}}
    >
      <>
        <div>{CATEGORY_ICONS?.[category._id] || <GeneralCategoryIcon className="w-10 h-10" />}</div>

        <span className="mt-4 capitalize">{category.name}</span>
      </>
    </Button>
  );
};

export default CategoryCard;
