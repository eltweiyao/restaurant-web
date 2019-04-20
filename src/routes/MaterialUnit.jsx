/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/MaterialUnit/list";
import Search from "../components/MaterialUnit/search";
import Modal from "../components/MaterialUnit/modal";

const MaterialUnit = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    currentItem
  } = cloudState.materialUnit;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "materialUnit/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "materialUnit/updateState",
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
        type: "materialUnit/showModal",
        payload: {
          modelType: "create",
          modalVisible: true
        }
      });
    },
    onReset() {
      dispatch({
        type: "materialUnit/updateState",
        payload: {
          searchData: {
            unitName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["materialUnit/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "materialUnit/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "materialUnit/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onEdit(item) {
      dispatch({
        type: "materialUnit/showModal",
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
    title: modelType === "create" ? "新增单位" : "修改单位",
    onCancel() {
      dispatch({
        type: "materialUnit/hideModal"
      });
      dispatch({
        type: "materialUnit/updateState",
        payload: {
          currentItem: {}
        }
      });
    },
    onConfirm(params) {
      console.log("params", params);
      if (params.pkUnit) {
        dispatch({
          type: "materialUnit/edit",
          payload: {
            ...params
          }
        });
      } else {
        dispatch({
          type: "materialUnit/add",
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

MaterialUnit.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(MaterialUnit);
