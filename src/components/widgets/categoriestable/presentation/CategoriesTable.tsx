import { useTranslation } from "react-i18next";
import { Category } from "../../../../services/category/CategoryTypes";
import ErrorMessage from "../../../basic/ErrorMessage";
import Grid from "../../../basic/Grid";


interface CategoriesTableProps {
    categories: Category[];
    isError: boolean
}
const CategoriesTable = (props: CategoriesTableProps) => {
    const {categories, isError} = props;

    const {t} = useTranslation();

    return (
        <>
            {
                isError &&
                <ErrorMessage message={t("pleaseTryAgainLater")} errorIconClassName="w-4 h-4" />
            }
            <div className="h-full">
            <Grid 
                rowData={categories}
                columnDefination={[
                    {
                        field: "_id"
                    },
                    {
                        field: "name"
                    }
                ]}
            />
            </div>
        </>
    )
}

export default CategoriesTable;