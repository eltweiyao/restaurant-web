/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm, Avatar, Tooltip } from "antd";
import styles from "./List.less";

const list = ({
  loading,
  dataList,
  accountType,
  pagination,
  onPageChange,
  onAddMaterial,
  onEditRecipeName,
  onDeleteRecipeMaterial,
  onEditMaterial,
  onDeleteRecipe
}) => {
  const expandedRowRender = record => {

    const columns =
      accountType === "1"
        ? [
            {
              title: "物料名称",
              dataIndex: "materialName",
              key: "materialName"
            },
            {
              title: "物料用量",
              dataIndex: "materialCount",
              key: "materialCount",
              render: text =>
                typeof text !== "undefined" && (
                  <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
                )
            },
            { title: "物料单位", dataIndex: "unitName", key: "unitName" },
            {
              title: "物料单价",
              dataIndex: "materialPrice",
              key: "materialPrice",
              render: text =>
                typeof text !== "undefined" && (
                  <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
                )
            },
            {
              title: "操作",
              render: item => (
                <span>
                  <button
                    className="btn-link"
                    onClick={() => onEditMaterial(record.pkRecipe, item)}
                  >
                    修改
                  </button>
                  &nbsp;&nbsp;
                  <Popconfirm
                    title="确定删除该条物料吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={() =>
                      onDeleteRecipeMaterial(record.pkRecipe, item.pkMaterial)
                    }
                  >
                    <button className="btn-link">删除</button>
                  </Popconfirm>
                </span>
              )
            }
          ]
        : [
            {
              title: "物料名称",
              dataIndex: "materialName",
              key: "materialName"
            },
            {
              title: "物料用量",
              dataIndex: "materialCount",
              key: "materialCount",
              render: text =>
                typeof text !== "undefined" && (
                  <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
                )
            },
            { title: "物料单位", dataIndex: "unitName", key: "unitName" }
          ];
    return (
      <Table
        columns={columns}
        dataSource={record.materials}
        rowKey={item => item.pkMaterial}
      />
    );
  };

  const columns =
    accountType === "1"
      ? [
          {
            title: "菜品图片",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: text =>
              typeof text !== "undefined" && text !== null ? (
                <Avatar
                  shape={"square"}
                  style={{ verticalAlign: "middle" }}
                  size="large"
                  src={text}
                />
              ) : (
                ""
              )
          },
          {
            title: "配方名称",
            dataIndex: "recipeName",
            key: "recipeName"
          },
          {
            title: "类别",
            dataIndex: "categoryName",
            key: "categoryName"
          },
          {
            title: "成本价",
            dataIndex: "originalPrice",
            key: "originalPrice",
            render: text =>
              typeof text !== "undefined" && (
                <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
              )
          },
          {
            title: "在售价",
            dataIndex: "recipePrice",
            key: "recipePrice",
            render: text =>
              typeof text !== "undefined" && (
                <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
              )
          },
          {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            render: text =>
              typeof text !== "undefined" && (
                <div>
                  <Tooltip title={text}>
                    <span className={styles.remark}>{text}</span>
                  </Tooltip>
              </div>
              )
          },
          {
            title: "操作",
            render: item => (
              <span>
                <button
                  className="btn-link"
                  onClick={() => onEditRecipeName(item)}
                >
                  修改菜品信息
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn-link"
                  onClick={() => onAddMaterial(item)}
                >
                  添加所用物料
                </button>
                &nbsp;&nbsp;
                <Popconfirm
                  title="确定删除配方吗？"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => onDeleteRecipe(item.pkRecipe)}
                >
                  <button className="btn-link">删除</button>
                </Popconfirm>
              </span>
            )
          }
        ]
      : [
          {
            title: "菜品图片",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: text =>
              typeof text !== "undefined" && text !== null ? (
                <Avatar
                  shape={"square"}
                  style={{ verticalAlign: "middle" }}
                  size="large"
                  src={text}
                />
              ) : (
                ""
              )
          },
          {
            title: "配方名称",
            dataIndex: "recipeName",
            key: "recipeName"
          },
          {
            title: "类别",
            dataIndex: "categoryName",
            key: "categoryName"
          },
          {
            title: "在售价",
            dataIndex: "recipePrice",
            key: "recipePrice",
            render: text =>
              typeof text !== "undefined" && (
                <div>{text.toString() ? Number(text).toFixed(2) : "--"}</div>
              )
          },
          {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            render: text =>
              typeof text !== "undefined" && (
                <div>
                  <Tooltip title={text}>
                    <span className={styles.remark}>{text}</span>
                  </Tooltip>
              </div>
              )
          }
        ];

  return (
    <div>
      <Table
        dataSource={dataList}
        columns={columns}
        rowKey={item => item.pkRecipe}
        expandedRowRender={expandedRowRender}
        pagination={pagination}
        onChange={onPageChange}
        loading={loading}
      />
    </div>
  );
};

list.propTypes = {
  loading: PropTypes.bool,
  accountType: PropTypes.Number,
  dataList: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onApply: PropTypes.func
};

export default list;
