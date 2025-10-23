//LoginForm.jsx
import { useEffect } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, firstMountCleanup } from "./authSlice";

const INITIAL_STATE = {
  userName: "",
  userPassword: "",
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
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: INITIAL_STATE,
    onSubmit: handleLogin,
  });

  return (
    <form onSubmit={handleSubmit} id="loginForm" className="form">
      <h2>Đăng nhập</h2>
      {authError && <div className="error">{authError}</div>}
      <Input
        label={"Tên"}
        name={"userName"}
        value={values.userName}
        placeholder={"Nhập tài khoản"}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.userName}
      />
      <Input
        type="password"
        label={"Mật khẩu"}
        name={"userPassword"}
        value={values.userPassword}
        placeholder={"Nhập mật khẩu"}
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.userPassword}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Đang xử lý" : "Đăng nhập"}
      </Button>
      <p className="form-link">
        Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
      </p>
    </form>
  );
};

export default LoginForm;
