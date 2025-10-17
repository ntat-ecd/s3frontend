import { useState } from "react";
import MenuItem from "../common/MenuItem";

const menuItems = [
  {
    id: "userList",
    text: "Danh sách người dùng",
  },
  {
    id: "productList",
    text: "Danh sách sản phẩm",
  },
];

const Sidebar = ({ items, isHidden }) => {
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(menuItems[0].id);

  const handleClick = (id) => {
    console.log(id === selectedMenuItemId);
    setSelectedMenuItemId(id);
  };

  return (
    <div className={`sidebar ${isHidden ? "hide" : ""}`}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          isSelected={item.id === selectedMenuItemId}
          isHidden={isHidden}
          onClick={() => handleClick(item.id)}
        >
          {item.text}
        </MenuItem>
      ))}
    </div>
  );
};

export default Sidebar;
