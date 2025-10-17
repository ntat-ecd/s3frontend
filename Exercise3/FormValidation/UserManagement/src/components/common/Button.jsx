const Button = ({ children, type = "", onClick, disabled = false, id }) => {
  return (
    <button className={`btn ${type}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
