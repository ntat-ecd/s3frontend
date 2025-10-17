import Cell from "./Cell";

const TableHeader = ({ headers }) => {
  console.log('TableHeader rendered 🚀');

  const columnsLength = headers.length;
  return (
    <div className="table-header table-row">
      {headers.map((header, index) => {
        const isLastRow = index === columnsLength - 1;
        let positionType = isLastRow ? "row-last-child" : "default";
      
        return (
          <Cell key={header} positionType={positionType}>
            {header}
          </Cell>
        );
      })}
    </div>
  );
};

export default TableHeader;
