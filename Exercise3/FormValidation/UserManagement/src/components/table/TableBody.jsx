import TableRow from "./TableRow";

const TableBody = ({ data }) => {
  const columnsLength = data[0]?.length || 0;

  return (
    <div className="table-body">
      {data.map((row, rowIndex) => {
        const isLastCol= rowIndex === data.length - 1;
      
        return (
          <TableRow
            key={rowIndex}
            rowData={row}
            isLastCol={isLastCol}
            columnsLength={columnsLength}
          />
        );
      })}
    </div>
  );
};

export default TableBody;
