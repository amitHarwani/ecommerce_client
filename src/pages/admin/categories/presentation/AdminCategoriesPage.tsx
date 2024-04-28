import { useMemo } from "react";
import CategoriesTableContainer from "../../../../components/widgets/categoriestable/container/CategoriesTableContainer";
import { useAppSelector } from "../../../../store";

const AdminCategoriesPage = () => {
  const headerHeight = useAppSelector((state) => state.uiInfo.headerHeight);

  /* Setting height as total screen height - headerHeight, for AG grid */
  const pageContentHeight = useMemo(() => {
    return `${window.innerHeight - headerHeight}px`;
  }, [headerHeight]);

  return (
    <div className="px-2 lg:px-10 py-4" style={{ height: pageContentHeight }}>
      <CategoriesTableContainer />
    </div>
  );
};

export default AdminCategoriesPage;
