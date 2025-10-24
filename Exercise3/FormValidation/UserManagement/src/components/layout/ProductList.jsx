import { useState } from "react";
import { mockProductColumns, mockProducts } from "../../data/mockData";
import DashboardHeader from "../common/DashboardHeader";
import { Table } from "antd";
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
  return (
    <div className="panel">
      <DashboardHeader title={`Danh sách sản phẩm`} />

      <Table
        columns={mockProductColumns}
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
