import Button from "../common/Button";

const ConfirmationModal = ({ children, onConfirm, onCancel, confirmText }) => {
  return (
    <div className="modal">
      <h2>{children}</h2>
      <div className="buttonGroup">
        <Button onClick={onCancel} type="white">
          Đóng
        </Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
