/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Category/list";
import Search from "../components/Category/search";
import Modal from "../components/Category/modal";

const Category = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    currentItem
  } = cloudState.category;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "category/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "category/updateState",
        payload: {
          searchData: {
            ...searchData,
            ...values
          }
        }
      });
    },
    onAdd() {
      dispatch({
        type: "category/showModal",
        payload: {
          modelType: "create",
          modalVisible: true
        }
      });
    },
    onReset() {
      dispatch({
        type: "category/updateState",
        payload: {
          searchData: {
            unitName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["category/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "category/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "category/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onEdit(item) {
      dispatch({
        type: "category/showModal",
        payload: {
          modelType: "edit",
          modelVisible: true,
          currentItem: {
            ...item
          }
        }
      });
    }
  };
  const modalProps = {
    visible: modalVisible,
    item: modelType === "create" ? {} : currentItem,
    title: modelType === "create" ? "新增类别" : "修改类别",
    onCancel() {
      dispatch({
        type: "category/hideModal"
      });
      dispatch({
        type: "category/updateState",
        payload: {
          currentItem: {}
        }
      });
    },
    onConfirm(params) {
      if (params.pkCategory) {
        dispatch({
          type: "category/edit",
          payload: {
            ...params
          }
        });
      } else {
        dispatch({
          type: "category/add",
          payload: {
            ...params
          }
        });
      }
    }
  };

  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      {modalVisible ? <Modal {...modalProps} /> : ""}
    </div>
  );
};

Category.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Category);
