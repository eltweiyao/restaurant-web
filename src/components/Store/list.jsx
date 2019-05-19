/*
 * @Author: wangtaidong
 * @Date: 2018-10-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm } from "antd";

const list = ({ loading, dataList, pagination, onPageChange, onEdit }) => {
  const columns = [
    {
      title: "门店名称",
      dataIndex: "storeName",
      key: "storeName"
    },
    {
      title: "门店地址",
      dataIndex: "storePosition",
      key: "storePosition",
      render: (text, record) =>
        typeof text !== "undefined" && (
          <div style={{ textAlign: "left" }}>
            {text.toString() + " " + record.detailAddress}
          </div>
        )
    },
    {
      title: "联系人",
      dataIndex: "contactName",
      key: "contactName"
    },
    {
      title: "绑定菜谱",
      dataIndex: "menuName",
      key: "menuName"
    },
    {
      title: "操作",
      render: item => (
        <span>
          <button className="btn-link" onClick={() => onEdit(item)}>
            修改
          </button>
          &nbsp;&nbsp;
          <Popconfirm
            title="确定删除配方吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => onDelete(record.pkStore)}
          >
            <button className="btn-link">删除</button>
          </Popconfirm>
        </span>
      )
    }
  ];

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={dataList}
        rowKey={item => item.pkStore}
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
