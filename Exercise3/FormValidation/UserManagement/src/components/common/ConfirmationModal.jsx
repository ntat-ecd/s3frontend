import Button from "./Button";

const ConfirmationModal = ({ children, onConfirm, onCancel, confirmText }) => {
  return (
    <div className="modal">
      <h2>{children}</h2>
      <div className="buttonGroup">
        <Button type="white" onClick={onCancel}>Đóng</Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
