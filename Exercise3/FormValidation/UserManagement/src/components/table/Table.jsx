import Cell from "./Cell";

const Table = ({ headers, data }) => {
  const gridTemplate = headers.map((col) => col.width || "1fr").join(" ");

  return (
    <div className="table" style={{ "--cols": gridTemplate }}>
      {/* Table Header */}
      <div className="table-header">
        {headers.map((col, colIndex) => {
          const isLastRow = colIndex === headers.length - 1;
          //   console.log(`---TABLE HEADER DEBUGGER---
          //   headers: ${headers}
          //   col.length: ${headers.length}
          //   isLastRow: ${isLastRow}
          //  `);
          return (
            <Cell
              key={col.key}
              positionType={isLastRow ? "row-last-child" : "default"}
            >
              {col.title}
            </Cell>
          );
        })}
      </div>

      {/* Table Body */}
      <div className="table-body">
        {data.map((row, rowIndex) => {
          const isLastCol = rowIndex === data.length - 1;
          return (
            <div className="table-row" key={row.id}>
              {headers.map((col, colIndex) => {
                const isLastRow = colIndex === headers.length - 1;
                let positionType = "default";
                if (isLastRow && isLastCol) positionType = "row-col-last-child";
                else if (isLastRow) positionType = "row-last-child";
                else if (isLastCol) positionType = "col-last-child";

                return (
                  <Cell key={col.key} positionType={positionType}>
                    {col.render(row)}
                  </Cell>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
