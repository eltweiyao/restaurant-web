/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Store/list";
import Search from "../components/Store/search";
import Modal from "../components/Store/modal";
import { message } from "antd";

const Store = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    menus,
    currentItem
  } = cloudState.store;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "store/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "store/updateState",
        payload: {
          searchData: {
            ...searchData,
            ...values
          }
        }
      });
    },
    onAdd() {
      if (menus !== undefined && Array.from(menus).length > 0) {
        dispatch({
          type: "store/showModal",
          payload: {
            modelType: "create",
            modalVisible: true
          }
        });
      } else {
        message.error("未查询到菜谱信息，请前往添加");
      }
    },

    onReset() {
      dispatch({
        type: "store/updateState",
        payload: {
          searchData: {
            menuName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["store/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "store/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "store/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onEdit(item) {
      if (menus !== undefined && Array.from(menus).length > 0) {
        dispatch({
          type: "store/showModal",
          payload: {
            modelType: "edit",
            modelVisible: true,
            currentItem: {
              ...item
            }
          }
        });
      } else {
        message.error("未查询到菜谱信息，请前往添加");
      }
    },
    onDelete(pkStore) {
      dispatch({
        type: "store/deleteStore",
        payload: {
          pkStore: pkStore
        }
      });
    }
  };
  const modalProps = {
    visible: modalVisible,
    menus: menus,
    item: modelType === "create" ? {} : currentItem,
    title: modelType === "create" ? "新增门店" : "修改门店",
    onCancel() {
      dispatch({
        type: "store/hideModal"
      });
      dispatch({
        type: "store/updateState",
        payload: {
          currentItem: {}
        }
      });
    },
    onConfirm(params) {
      if (params.pkStore) {
        dispatch({
          type: "store/edit",
          payload: {
            ...params
          }
        });
      } else {
        dispatch({
          type: "store/add",
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

Store.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Store);
