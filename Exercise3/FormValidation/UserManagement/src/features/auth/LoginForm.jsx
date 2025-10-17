//LoginForm.jsx
import { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, firstMountCleanup } from "./authSlice";

const INITIAL_STATE = {
  userName: "",
  userPassword: "",
};

const validate = (values) => {
  const newErrors = {};
  const specialCharRegex = /[^\w.@]/;
  if (specialCharRegex.test(values.userName))
    newErrors.userName = "Tên đăng nhập không được\nchứa ký tự đặc biệt.";
  if (!values.userName) newErrors.userName = "Vui lòng nhập tên đăng nhập.";

  if (values.userPassword.length < 8)
    newErrors.userPassword = "Mật khẩu phải có ít nhất\n8 ký tự.";
  if (!values.userPassword) newErrors.userPassword = "Vui lòng nhập mật khẩu.";

  return newErrors;
};

const LoginForm = () => {
  //redux setup
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, authError, status } = useSelector(
    (state) => state.auth
  );
  const isLoading = status === "loading";

  //on very first mount cleanup
  useEffect(() => {
    dispatch(firstMountCleanup());
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  const handleLogin = (formValues) => {
    dispatch(loginUser(formValues));
  };

  //useForm setup
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: INITIAL_STATE,
    validate,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={handleSubmit} id="loginForm" className="loginForm">
      <h2>Đăng nhập</h2>
      {authError && <div className="error">{authError}</div>}
      <Input
        label={"Tên"}
        name={"userName"}
        value={values.userName}
        placeholder={"Nhập tài khoản"}
        onChange={handleChange}
        error={errors.userName}
      />
      <Input
        type="password"
        label={"Mật khẩu"}
        name={"userPassword"}
        value={values.userPassword}
        placeholder={"Nhập mật khẩu"}
        onChange={handleChange}
        error={errors.userPassword}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý" : "Đăng nhập"}
      </Button>
    </form>
  );
};

export default LoginForm;
