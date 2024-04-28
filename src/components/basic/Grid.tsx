import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ColDef } from "ag-grid-community";

interface GridProps<RowType> {
  rowData: RowType[];
  columnDefination: ColDef[];
}

const Grid = <RowType,>(props: GridProps<RowType>) => {
  const { rowData, columnDefination } = props;

  return (
    <>
      <div className="ag-theme-quartz h-full">
        <AgGridReact rowData={rowData} columnDefs={columnDefination} pagination={true} />
      </div>
    </>
  );
};

export default Grid;
