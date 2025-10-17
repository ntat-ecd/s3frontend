import { useState } from "react";
import Avatar from "../components/common/Avatar";
import NavToggle from "../components/common/NavToggle";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import UserManagementPanel from "../components/layout/UserManagementPanel";
import Button from "../components/common/Button";

const Dashboard = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const handleToggleClick = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <div className="dashboard">
      <Navbar>
        <NavToggle isActive={isSidebarHidden} onClick={handleToggleClick} />
        
        <Avatar userPic="/avatar.webp" userName="Capybara" />
        
      </Navbar>
      <div className="container-row">
        <Sidebar isHidden={isSidebarHidden} />
        <UserManagementPanel />
      </div>
    </div>
  );
};

export default Dashboard;
