const Tickbox = ({ isActive, onChange }) => {
  return (
    <div className={"tickbox"} onClick={onChange}>
      <input type="checkbox" checked={isActive} onChange={onChange}/>
      <span className="checkmark"></span>
      <span>{isActive ? "Đã kích hoạt" : "Chưa kích hoạt"}</span>
    </div>
  );
};
export default Tickbox;
