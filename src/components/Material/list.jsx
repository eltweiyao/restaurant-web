/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const list = ({ loading, dataList, pagination, onPageChange, onEdit }) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "materialName",
      key: "materialName"
    },
    {
      title: "单位",
      dataIndex: "unitName",
      key: "unitName"
    },
    {
      title: "单价",
      dataIndex: "materialPrice",
      key: "materialPrice",
      render: text =>
        typeof text !== "undefined" && (
          <div style={{ textAlign: "left" }}>
            {text.toString() ? Number(text).toFixed(2) : "--"}
          </div>
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
        rowKey={item => item.pkMaterial}
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
