import { useDispatch } from "react-redux";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Avatar = ({ userName, userPic }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="userInfo">
      <span className="userName">{userName}</span>
      <img className="userPic" src={userPic} alt="Picture of user" />
      <Button type="logout" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Avatar;
