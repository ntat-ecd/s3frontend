import { useState } from "react";
import Avatar from "../components/common/Avatar";
import NavToggle from "../components/common/NavToggle";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const userName = useSelector((state) => state.auth.user.userName);
  const handleToggleClick = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="dashboard">
      <Navbar>
        <NavToggle isActive={isSidebarHidden} onClick={handleToggleClick} />

        <Avatar userPic="/avatar.webp" userName={userName} />
      </Navbar>
      <div className="container-row">
        <Sidebar isHidden={isSidebarHidden} />
        {/* <UserManagementPanel /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
