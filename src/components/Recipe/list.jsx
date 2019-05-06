/*
 * @Author: wangtaidong
 * @Date: 2018-10-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import { saveSession, getSession, toStr } from "../../utils/";
import { Table, Popconfirm, Avatar } from "antd";

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
  console.log("accountType", accountType);
  const expandedRowRender = record => {
    /*
      NOTE:
      这里能够取到当前点击的是哪个配方，也能够得到所有的配方与物料关联信息，因此没有再调用后台接口
      而是直接由前端根据所有信息，判断哪一条信息是与当前配方有关的物料信息，将它过滤到recipeDetail中
     */
    console.log("aaa", accountType);
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
              key: "materialCount"
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
              key: "materialCount"
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
            }
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
