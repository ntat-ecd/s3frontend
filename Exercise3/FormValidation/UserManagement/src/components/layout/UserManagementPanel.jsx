import ActionGroup from "../common/ActionGroup";
import Button from "../common/Button";
import Tickbox from "../common/Tickbox";
import Table from "../table/Table";
import {
  addUser,
  updateUser,
  deleteUser,
} from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";
import DashboardHeader from "../common/DashboardHeader";
import UserFormModal from "../../features/users/UserFormModal";

const UserManagementPanel = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  const newId = Date.now();
  const EMPTY_USER = {
    id: newId,
    name: "",
    email: "",
    phoneNumber: "",
    status: true,
  };

  //MODAL logic and helper
  const [modalState, setModalState] = useState({ type: null, props: {} });
  const openModal = (type, props) => {
    
    setModalState({ type, props });
  };
  const closeModal = () => {
    setModalState({ type: null, props: {} });
  };

  //on confirm button clicked
  const handleConfirmToggle = () => {
    const { user } = modalState.props;
    if (user) {
      const updatedUser = { ...user, status: !user.status };
      dispatch(updateUser(updatedUser));
    }
    closeModal();
  };
  //on confirm button clicked
  const handleConfirmDelete = () => {
    const { user } = modalState.props;
    if (user) dispatch(deleteUser(user.userId));
    closeModal();
  };

  const handleAddUser = (formData) => {
    dispatch(addUser(formData));
    closeModal();
  };

  const handleEditUser = (formData) => {
    dispatch(updateUser(formData));
    closeModal();
  };

  const handleRowClick = (user) => {
    openModal("view", { user });
  };
  //headers
  const headers = [
    {
      key: "name",
      title: "Tên",
      width: "2fr",
      render: (row) => (
        <div className="clickable-cell" onClick={() => handleRowClick(row)}>
          {row.userName}
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      width: "2fr",
      render: (row) => (
        <div className="clickable-cell" onClick={() => handleRowClick(row)}>
          {row.userEmail}
        </div>
      ),
    },
    {
      key: "phoneNumber",
      title: "Số điện thoại",
      width: "1.5fr",
      render: (row) => row.userPhoneNumber,
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      width: "150px",
      render: (row) => row.updatedAt,
    },
    {
      key: "status",
      title: "Trạng thái",
      width: "200px",
      render: (row) => (
        <Tickbox
          isActive={row.status}
          onChange={() => openModal("TOGGLE_STATUS", { user: row })}
        />
      ),
    },
    {
      key: "acions",
      title: "Thao tác",
      width: "150px",
      render: (row) => <ActionGroup user={row} onOpenModal={openModal} />,
    },
  ];

  return (
    <>
      <div className="panel">
        <DashboardHeader title="Danh sách người dùng">
          <Button
            type="addUserBtn"
            onClick={() => openModal("add", { user: EMPTY_USER })}
          >
            <span id="addSign">+</span>
            <span id="addText">Thêm</span>
          </Button>
        </DashboardHeader>

        <Table headers={headers} data={users} />
      </div>

      {/* FORM MODALS */}
      {(modalState.type === "add" ||
        modalState.type === "edit" ||
        modalState.type === "view") && (
        <UserFormModal
          mode={modalState.type}
          user={modalState.props.user}
          onCancel={closeModal}
          onSubmit={modalState.type === "add" ? handleAddUser : handleEditUser}
        />
      )}
      {modalState.type === "TOGGLE_STATUS" && (
        <div className="overlay" onClick={closeModal}>
          <ConfirmationModal
            onConfirm={handleConfirmToggle}
            onCancel={closeModal}
            confirmText={
              modalState.props.user?.status ? "Hủy kích hoạt" : "Kích hoạt"
            }
          >{`${
            modalState.props.user?.status ? "Hủy kích hoạt" : "Kích hoạt"
          } tài khoản "${
            modalState.props.user.name
          }"?`}</ConfirmationModal>{" "}
        </div>
      )}
      {modalState.type === "DELETE_USER" && (
        <div className="overlay" onClick={closeModal}>
          <ConfirmationModal
            onConfirm={handleConfirmDelete}
            onCancel={closeModal}
            confirmText="Xóa"
          >{`Bạn muốn xóa tài khoản "${modalState.props.user.userName}"?`}</ConfirmationModal>{" "}
        </div>
      )}
    </>
  );
};

export default UserManagementPanel;
