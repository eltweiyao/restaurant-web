/*
 * @Author: wangtaidong
 * @Date: 2018-10-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const list = ({
  loading,
  dataList,
  pagination,
  onPageChange,
  onEdit,
  onView
}) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "menuName",
      key: "menuName"
    },
    {
      title: "菜品数量",
      dataIndex: "recipeCount",
      key: "recipeCount",
      render: (text, record) =>
        text > 0 ? (
          <button
            className="btn-link"
            type="button"
            onClick={() => {
              onView(record);
            }}
          >
            {text}
          </button>
        ) : (
          text
        )
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
        rowKey={item => item.pkMenu}
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
