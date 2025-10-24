const ActionGroup = ({ user, onOpenModal }) => {
  const handleDeleteClick = () => {
    onOpenModal("DELETE_USER", { user });
  };
  const handleEditClick = () => {
    console.log('handleEditClick called with {user}: ', user)
    onOpenModal("edit", { user });
  };
  return (
    <div className="actionGroup">
      <div className="iconEdit" onClick={handleEditClick}></div>
      <div className="iconDelete" onClick={handleDeleteClick}></div>
    </div>
  );
};

export default ActionGroup;
