import React from "react";
import { Table } from "antd";

const DynamicColumnsTable = props => {
  const { columns, height, rowKey, source, width } = props;

  return (
    <Table
      columns={columns}
      dataSource={source}
      rowKey={rowKey}
      scroll={{ x: width, y: height }}
    />
  );
};

export default DynamicColumnsTable;
