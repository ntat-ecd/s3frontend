import ActionGroup from "../common/ActionGroup";
import Button from "../common/Button";
import Tickbox from "../common/Tickbox";
import Table from "../table/Table";
import { fetchUsers, toggleUserStatus } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ConfirmationModal from "../common/ConfirmationModal";

const UserManagementPanel = () => {
  const dispatch = useDispatch();
  const { users, status, usersError } = useSelector((state) => state.users);
  //MODAL logic and helper
  const [modalState, setModalState] = useState({ type: null, props: {} });
  const openModal = (type, props) => {
    setModalState({ type, props });
  };
  const closeModal = () => {
    setModalState({ type: null, props: {} });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  //on confirm button clicked
  const handleConfirmToggle = () => {
    const { user } = modalState.props;
    if (user) dispatch(toggleUserStatus(user));
    closeModal();
  };
  //on confirm button clicked
  const handleConfirmDelete = () => {
    const { user } = modalState.props;
    if (user) dispatch(deleteUser.user.id);
    closeModal();
  };

  //headers
  const headers = [
    {
      key: "name",
      title: "Tên",
      width: "2fr",
      render: (row) => row.name, // plain text
    },
    {
      key: "email",
      title: "Email",
      width: "2fr",
      render: (row) => row.email,
    },
    {
      key: "updatedAt",
      title: "Ngày cập nhật",
      width: "200px",
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
      key: "actions",
      title: "Thao tác",
      width: "150px",
      render: (row) => <ActionGroup user={row} onOpenModal={openModal} />,
    },
  ];

  useEffect(() => {
    console.log(modalState);
  }, [modalState]);
  return (
    <>
      <div className="userManagementPanel">
        <div className="flex flex-row justify-between align-center">
          <h2>Danh sách</h2>
          <Button type="addUserBtn">
            <span id="addSign">+</span>
            <span id="addText">Thêm</span>
          </Button>
        </div>
        <Table headers={headers} data={users} />
      </div>
      {modalState.type === "TOGGLE_STATUS" && (
        <div className="overlay">
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
        <div className="overlay">
          <ConfirmationModal
            onConfirm={handleConfirmDelete}
            onCancel={closeModal}
            confirmText="Xóa"
          >{`Bạn muốn xóa tài khoản "${modalState.props.user.name}"?`}</ConfirmationModal>{" "}
        </div>
      )}
    </>
  );
};

export default UserManagementPanel;
