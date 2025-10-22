//SignUp.jsx
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  firstMountCleanup,
  registerUser,
  resetRegistrationStatus,
} from "./authSlice";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const INITIAL_STATE = {
  userName: "",
  userPassword: "",
  userEmail: "",
  userPhoneNumber: "",
};

const validate = (values) => {
  const newErrors = {};
  const specialCharRegex = /[^\w.@]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^\d{10,}$/;

  //Name validate
  if (specialCharRegex.test(values.userName))
    newErrors.userName = "Tên đăng nhập không được\nchứa ký tự đặc biệt.";
  if (!values.userName) newErrors.userName = "Vui lòng nhập tên đăng nhập.";
  //Password validate
  if (values.userPassword.length < 8)
    newErrors.userPassword = "Mật khẩu phải có ít nhất\n8 ký tự.";
  if (!values.userPassword) newErrors.userPassword = "Vui lòng nhập mật khẩu.";
  //Email validate
  if (!emailRegex.test(values.userEmail))
    newErrors.userEmail = "Email không hợp lệ.";
  if (!values.userEmail) newErrors.userEmail = "Vui lòng điền email.";
  //Phone number validate
  if (!phoneRegex.test(values.userPhoneNumber))
    newErrors.userPhoneNumber = "Số điện thoại phải có\nít nhất 10 chữ số.";
  if (!values.userPhoneNumber)
    newErrors.userPhoneNumber = "Vui lòng nhập số điện thoại.";
  return newErrors;
};

const SignUpForm = () => {
  //redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, status, registrationSuccess } = useSelector(
    (state) => state.auth
  );

  const isLoading = status === "loading";

  //on very first mount cleanup
  useEffect(() => {
    dispatch(resetRegistrationStatus());
    dispatch(firstMountCleanup());
  }, [dispatch]);

  const handleRegister = (formValues) => {
    dispatch(registerUser(formValues));
  };

  //useForm setup
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: INITIAL_STATE,
    validate,
    onSubmit: handleRegister,
  });

  if (registrationSuccess)
    return (
      <div className="signup-success">
        <h2>Đăng ký thành công!</h2>
        <p>{`Bạn có thể đăng nhập\nvới tài khoản vừa tạo!`}</p>
        <Button onClick={() => navigate("/")}>Quay lại trang Đăng nhập</Button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} id="signupForm" className="form">
      <h2>đăng ký</h2>
      {authError && <div className="error">{authError}</div>}

      <Input
        label={"Tên"}
        name={"userName"}
        value={values.userName}
        placeholder={"Nhập tài khoản"}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.userName}
      />

      <Input
        type="password"
        label={"Mật khẩu"}
        name={"userPassword"}
        value={values.userPassword}
        placeholder={"Nhập mật khẩu"}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.userPassword}
      />

      <Input
        type="email"
        label={"Email"}
        name={"userEmail"}
        value={values.userEmail}
        placeholder={"Nhập email"}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.userEmail}
      />

      <Input
        label={"Số điện thoại"}
        name={"userPhoneNumber"}
        value={values.userPhoneNumber}
        placeholder={"Nhập số điện thoại"}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.userPhoneNumber}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý" : "Đăng ký"}
      </Button>

      <p className="form-link">
        Đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
