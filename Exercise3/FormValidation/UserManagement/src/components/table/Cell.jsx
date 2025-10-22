//positionType = 'default', 'row-last-child', 'col-last-child', 'row-col-last-child'
const Cell = ({ children, positionType, isClickable }) => {
  return (
    <div
      className={`cell ${positionType} ${isClickable ? "clickable-cell" : ""}`}
    >
      {children}
    </div>
  );
};

export default Cell;
