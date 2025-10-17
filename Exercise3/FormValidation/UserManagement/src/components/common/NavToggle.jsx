const NavToggle = ({ onClick, isActive }) => {
  return (
    <div
      className={`navToggle ${isActive ? "active" : ""}`}
      onClick={onClick}
    ></div>
  );
};

export default NavToggle;
