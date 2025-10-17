const Input = ({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="input">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Input;
