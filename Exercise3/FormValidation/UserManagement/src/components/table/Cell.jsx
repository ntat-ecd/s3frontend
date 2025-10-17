//positionType = 'default', 'row-last-child', 'col-last-child', 'row-col-last-child'
const Cell = ({ children, positionType }) => {
  return <div className={`cell ${positionType}`}>{children}</div>;
};

export default Cell;
