const MenuItem = ({ children, isSelected, isHidden, onClick }) => {
  return (
    <div className={`menuItem ${isSelected ? "selected" : ""} ${isHidden? "hide" : ""}`} onClick={onClick}>{children}</div>
  );
};

export default MenuItem;
