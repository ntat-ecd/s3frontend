import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/common/Input";
import Tickbox from "../../components/common/Tickbox";
import Button from "../../components/common/Button";

const UserFormModal = ({ user, mode, onSubmit, onCancel }) => {
  //console.log("UserFormModal mounted, with parameters: ", user, mode);
  //viewMode
  const isReadOnly = mode === "view";

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm({ initialValues: user, onSubmit });

  useEffect(() => {
    if (user) setValues(user);
  }, [user, setValues]);

  return (
    <div className="overlay">
      <div className="modal">
        <h2>
          {mode === "add"
            ? "Thêm người dùng"
            : mode === "edit"
            ? "Chỉnh sửa người dùng"
            : "Xem thông tin"}
        </h2>
        <form onSubmit={handleSubmit} className="formModal">
          <Input
            label="ID"
            name="userId"
            value={values.userId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.userId}
            disabled={true}
          />
          <Input
            label="Tên"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.userName}
            disabled={isReadOnly}
          />
          <Input
            label="Email"
            name="userEmail"
            type="email"
            value={values.userEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.userEmail}
            disabled={isReadOnly}
          />
          <Input
            label="Số điện thoại"
            name="userPhoneNumber"
            value={values.userPhoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.userPhoneNumber}
            disabled={isReadOnly}
          />
          <div className="form-group">
            <label>Trạng thái</label>
            <Tickbox
              isActive={values.status}
              onChange={() => {
                if (!isReadOnly)
                  setValues((v) => ({ ...v, status: !v.status }));
              }}
            />
          </div>

          <div className="buttonGroup">
            <Button type="white" onClick={onCancel}>
              Đóng
            </Button>
            {!isReadOnly && (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu" : "Lưu"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
