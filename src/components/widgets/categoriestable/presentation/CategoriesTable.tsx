import {
  ColDef,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from "ag-grid-community";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BREAKPOINTS,
  ButtonTypes,
  DATE_TIME_FORMATS,
} from "../../../../constants";
import useBreakpointCheck from "../../../../hooks/useBreakpointCheck";
import { Category } from "../../../../services/category/CategoryTypes";
import {
  convertUTCToLocalTime,
  formatDateTime,
  gridDateFilterComparator,
  gridDateSortComparator,
} from "../../../../utils/dateTimeHelper";
import Button from "../../../basic/Button";
import ErrorMessage from "../../../basic/ErrorMessage";
import Grid from "../../../basic/Grid";
import AddEditCategoryModalContainer from "../../../modals/addeditcategorymodal/container/AddEditCategoryModalContainer";
import CategoryOptionsCell from "./CategoryOptionsCell";
import DeleteCategoryModalContainer from "../../../modals/deletecategorymodal/container/DeleteCategoryModalContainer";
import { useAppSelector } from "../../../../store";


/* Category with it's index in list as part of the object */
export interface IndexedCategory extends Category {
  actualIndexInList: number
}

interface CategoriesTableProps {
  categories: Category[];
  isError: boolean;
  onCategoryAddedOrUpdatedHandler(
    newCategory: Category,
    selectedCategoryIndex: number
  ): void;
  onCategoryDeletedHandler(categoryIndex: number): void;
}
const CategoriesTable = (props: CategoriesTableProps) => {
  const {
    categories,
    onCategoryAddedOrUpdatedHandler,
    onCategoryDeletedHandler,
    isError,
  } = props;

  const { t } = useTranslation();

  const isRTL = useAppSelector((state) => state.language.isRTL);

  /* Column Defination for the grid */
  const CATEGORIES_TABLE_COL_DEFS: ColDef[] = [
    {
      field: "name",
      sortable: false,
      filter: "agTextColumnFilter",
      filterParams: {
        maxNumConditions: 1,
        filterOptions: ["contains"],
      },
    },
    {
      field: "createdAt",
      unSortIcon: true,
      comparator: gridDateSortComparator,
      filter: "agDateColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["equals"],
        comparator: gridDateFilterComparator,
      },
    },
    {
      field: "updatedAt",
      unSortIcon: true,
      comparator: gridDateSortComparator,
      filter: "agDateColumnFilter",
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ["equals"],
        comparator: gridDateFilterComparator,
      },
    },
    {
      field: "",
      maxWidth: 100,
      resizable: false,
      cellRenderer: CategoryOptionsCell,
      cellRendererParams: {
        onEditOrDeleteClickHandler: toggleEditOrDeleteCategoryModal,
      },
    },
  ];

  /* Is large screen */
  const isLG = useBreakpointCheck(BREAKPOINTS.lg);

  /* Visibility of AddEdit Category dialog */
  const [isAddEditCategoryModalShown, setIsAddEditCategoryModalShown] =
    useState(false);

  /* Visibility of Delete Category dialog */
  const [isDeleteCategoryModalShown, setIsDeleteCategoryModalShown] =
    useState(false);

  /* Selected category for edit & delete options on a category */
  const [selectedCategory, setSelectedCategory] = useState<{
    category: IndexedCategory;
    index: number;
  }>();

  /* Formatting categories */
  const categoriesFormatted = useMemo(() => {
    const formatted: IndexedCategory[] = [];
    categories.forEach((category, index) => {

      /* Cloning the object, so the original object from container doesn't get updated */
      category = { ...category };

      /* Converting all times to local and formatting them */
      category.createdAt = formatDateTime(
        convertUTCToLocalTime(
          category.createdAt,
          DATE_TIME_FORMATS.standardDateWithTime
        ),
        DATE_TIME_FORMATS.standardDateWithTime,
        DATE_TIME_FORMATS.displayedDateWithTime
      );

      category.updatedAt = formatDateTime(
        convertUTCToLocalTime(
          category.updatedAt,
          DATE_TIME_FORMATS.standardDateWithTime
        ),
        DATE_TIME_FORMATS.standardDateWithTime,
        DATE_TIME_FORMATS.displayedDateWithTime
      );

      formatted.push({...category, actualIndexInList: index});
    });
    return formatted;
  }, [categories]);

  /* Toggle Add Category Dialog */
  const toggleAddCategoryModal = () => {
    /* Reset selected category */
    setSelectedCategory(undefined);
    setIsAddEditCategoryModalShown((prev) => !prev);
  };

  /* Toggle Edit or Delete Category Dialog */
  function toggleEditOrDeleteCategoryModal(
    category: IndexedCategory,
    type: "EDIT" | "DELETE"
  ) {
    /* If there is no selected category: Toggle is to show the dialog */
    if (!selectedCategory && category) {
      /* Set selected category and index of the category in the list */
      setSelectedCategory({ category: category, index: category.actualIndexInList });
    } else {
      /* Set category to undefined */
      setSelectedCategory(undefined);
    }
    /* Toggle the dialog */
    if (type === "EDIT") {
      setIsAddEditCategoryModalShown((prev) => !prev);
    } else {
      setIsDeleteCategoryModalShown((prev) => !prev);
    }
  }

  /* 
  On Large screens fit the entire width, on smaller screens fit the contents of a cell 
  */
  const autoSizeStrategy:
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy = useMemo(() => {
    if (isLG) {
      return {
        type: "fitGridWidth",
      };
    }
    return {
      type: "fitCellContents",
    };
  }, [isLG]);

  return (
    <>
      {isError ? (
        <ErrorMessage
          message={t("pleaseTryAgainLater")}
          errorIconClassName="w-6 h-6"
          className="justify-center text-lg"
        />
      ) : (
        <>
          {isAddEditCategoryModalShown && (
            <AddEditCategoryModalContainer
              hideModal={toggleAddCategoryModal}
              category={
                selectedCategory ? selectedCategory.category : undefined
              }
              onCategoryAddedOrUpdatedHandler={(category) =>
                onCategoryAddedOrUpdatedHandler(
                  category,
                  selectedCategory ? selectedCategory.index : -1
                )
              }
            />
          )}
          {isDeleteCategoryModalShown && selectedCategory && (
            <DeleteCategoryModalContainer
              hideModal={() =>
                toggleEditOrDeleteCategoryModal(
                  selectedCategory.category,
                  "DELETE"
                )
              }
              category={selectedCategory.category}
              onCategoryDeleted={() => {
                onCategoryDeletedHandler(selectedCategory.index);
              }}
            />
          )}
          <div className="h-full flex flex-col gap-y-4" dir={isRTL ? 'rtl': 'ltr'}>
            <Button
              buttonType={ButtonTypes.primaryButton}
              onClickHandler={toggleAddCategoryModal}
              className="capitalize px-8 py-1 w-fit self-end"
            >
              <span>{t("addCategory")}</span>
            </Button>
            <Grid
              rowData={categoriesFormatted}
              columnDefination={CATEGORIES_TABLE_COL_DEFS}
              autoSizeStrategy={autoSizeStrategy}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesTable;
