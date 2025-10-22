import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Input from "../../components/common/Input";
import Tickbox from "../../components/common/Tickbox";
import Button from "../../components/common/Button";

const UserFormModal = ({ user, mode, onSubmit, onCancel }) => {
  console.log("UserFormModal mounted, with parameters: ", user, mode);
  //viewMode
  const isReadOnly = mode === "view";

  const validate = (values) => {
    const newErrors = {};
    const specialCharRegex = /[^\w.@]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^\d{10,}$/;

    //Name validate
    if (specialCharRegex.test(values.name))
      newErrors.name = "Tên đăng nhập không được\nchứa ký tự đặc biệt.";
    if (!values.name) newErrors.name = "Vui lòng nhập tên đăng nhập.";

    //Email validate
    if (!emailRegex.test(values.email)) newErrors.email = "Email không hợp lệ.";
    if (!values.email) newErrors.email = "Vui lòng điền email.";
    //Phone number validate
    if (!phoneRegex.test(values.phoneNumber))
      newErrors.phoneNumber = "Số điện thoại phải có\nít nhất 10 chữ số.";
    if (!values.phoneNumber)
      newErrors.phoneNumber = "Vui lòng nhập số điện thoại.";
    return newErrors;
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useForm({ initialValues: user, validate, onSubmit });

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
            name="id"
            value={values.id}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.id}
            disabled={true}
          />
          <Input
            label="Tên"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            disabled={isReadOnly}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            disabled={isReadOnly}
          />
          <Input
            label="Số điện thoại"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phoneNumber}
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
