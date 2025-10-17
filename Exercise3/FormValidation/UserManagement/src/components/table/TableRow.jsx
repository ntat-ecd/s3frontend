import Cell from "./Cell";

const TableRow = ({ rowData, isLastCol, columnsLength }) => {
  return (
    <div className="table-row">
      {rowData.map((cellValue, colIndex) => {
        const isLastRow = colIndex === columnsLength - 1;
        let positionType = "default";

        if (isLastCol && isLastRow) positionType = "row-col-last-child";
        else if (isLastCol) positionType = "row-last-child";
        else if (isLastRow) positionType = "col-last-child";

        return (
          <Cell key={colIndex} positionType={positionType}>
            {cellValue}
          </Cell>
        );
      })}
    </div>
  );
};

export default TableRow;
