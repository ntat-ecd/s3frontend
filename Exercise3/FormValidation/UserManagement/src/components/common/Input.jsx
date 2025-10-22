const Input = ({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  onBlur,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div className="inputSection">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Input;
