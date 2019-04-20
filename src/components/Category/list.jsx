/*
 * @Author: wangtaidong
 * @Date: 2018-10-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const list = ({ loading, dataList, pagination, onPageChange, onEdit }) => {
  const columns = [
    {
      title: "类别名称",
      dataIndex: "categoryName",
      key: "unitName"
    },
    {
      title: "操作",
      render: item => (
        <span>
          <button className="btn-link" onClick={() => onEdit(item)}>
            修改
          </button>
        </span>
      )
    }
  ];

  return (
    <div>
      <Table
        bordered
        dataSource={dataList}
        columns={columns}
        rowKey={item => item.pkUnit}
        pagination={pagination}
        onChange={onPageChange}
        loading={loading}
      />
    </div>
  );
};

list.propTypes = {
  loading: PropTypes.bool,
  dataList: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onApply: PropTypes.func
};

export default list;