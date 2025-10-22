import { useState } from "react";
import MenuItem from "../common/MenuItem";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    id: "userList",
    path: "/dashboard",
    text: "Danh sách người dùng",
  },
  {
    id: "productList",
    path: "/dashboard/products",

    text: "Danh sách sản phẩm",
  },
];

const Sidebar = ({ isHidden }) => {
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(menuItems[0].id);

  const handleClick = (id) => {
    console.log(id === selectedMenuItemId);
    setSelectedMenuItemId(id);
  };

  return (
    <div className={`sidebar ${isHidden ? "hide" : ""}`}>
      {/* {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          isSelected={item.id === selectedMenuItemId}
          isHidden={isHidden}
          onClick={() => handleClick(item.id)}
        >
          {item.text}
        </MenuItem>
      ))} */}
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          end={item.path === "/dashboard"}
          className={({ isActive }) =>
            `menuItem ${isActive ? "selected" : ""}` +
            `${isHidden ? " hide" : ""}`
          }
        >
          {item.text}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
