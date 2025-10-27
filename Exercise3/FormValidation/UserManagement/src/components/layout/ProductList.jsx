import { useRef, useState } from "react";
import { mockProductColumns, mockProducts } from "../../data/mockData";
import DashboardHeader from "../common/DashboardHeader";
import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";

const ProductList = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50],
  });

  const handleTableChange = (newPagination) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropDown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) setTimeout(() => searchInput.current?.select(), 100);
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
  {
    title: "Product ID",
    dataIndex: "productId",
    key: "productId",
    width: 180,
    fixed: "left",
    sorter: (a, b) => a.productId.localeCompare(b.productId),
    ...getColumnSearchProps('productId'),
  },
  {
    title: "Name",
    dataIndex: "productName",
    key: "productName",
    ellipsis: true,

    filters: [
      { text: "Mouse", value: "mouse" },
      { text: "Headset", value: "headset" },
      { text: "Keyboard", value: "keyboard" },
    ],
    filterMode: "menu",
    filterSearch: true,
    onFilter: (value, record) =>
      record.productName.toLowerCase().includes(value),
    // sorter: (a, b) => a.productName.localeCompare(b.productName),
    ...getColumnSearchProps('productName'),

  },
  {
    title: "Quantity",
    dataIndex: "productQuantity",
    key: "productQuantity",
    align: "right",
    width: 120,

    sorter: (a, b) => a.productQuantity - b.productQuantity,
    render: (qty) => (
      <span
        style={{
          color: qty === 0 ? "red" : qty < 20 ? "gold" : "inherit",
        }}
      >
        {qty}
      </span>
    ),
  },
  {
    title: "Price ($)",
    dataIndex: "productPrice",
    key: "productPrice",
    align: "right",
    width: 120,

    sorter: (a, b) => a.productPrice - b.productPrice,
    render: (price) => `$${price.toFixed(2)}`,
  },
  {
    title: "Last Update",
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "center",
    width: 180,

    sorter: (a, b) => dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
    // defaultSortOrder: "descend",
    render: (date) => dayjs(date).format("DD-MM-YYYY"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: 180,

    filters: [
      { text: "Available", value: "Available" },
      { text: "Low Stock", value: "Low Stock" },
      { text: "Out of Stock", value: "Out of Stock" },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      const color =
        status === "Available"
          ? "green"
          : status === "Low Stock"
          ? "gold"
          : "volcano";
      return <Tag color={color}>{status}</Tag>;
    },
  },
];
  return (
    <div className="panel">
      <DashboardHeader title={`Danh sách sản phẩm`} />

      <Table
        columns={columns}
        dataSource={mockProducts}
        rowKey="productId"
        pagination={pagination}
        bordered
        scroll={{ x: 900 }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductList;
