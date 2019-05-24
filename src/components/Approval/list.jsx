/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm } from "antd";

const list = ({ loading, dataList, pagination, onPageChange, onAgree, onReject }) => {
  const columns = [
    {
      title: "企业名称",
      dataIndex: "companyName",
      key: "companyName"
    },
    {
      title: "企业账户",
      dataIndex: "account",
      key: "account"
    },
    {
      title: "审核状态",
      dataIndex: "accountType",
      key: "accountType",
      render: text => text === 3 ? '未授权' : "已授权"
    },
    {
      title: "操作",
      render: item => (
        <span>
          {item.accountType === 3 ? 
          <div>
          <Popconfirm
            title="确定同意授权该企业账户吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() =>
              onAgree(item.pkCompany)
            }
          >
            <button className="btn-link">授权</button>
          </Popconfirm>
          &nbsp;&nbsp;
          </div>
          :""}
          <Popconfirm
            title="确定删除该企业账户吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() =>
              onReject(item.pkCompany)
            }
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
        dataSource={dataList}
        columns={columns}
        rowKey={item => item.pkCompany}
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
