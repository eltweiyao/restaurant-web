/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/DishMenu/list";
import Search from "../components/DishMenu/search";
import Modal from "../components/DishMenu/modal";
import ViewModal from "../components/DishMenu/viewModal";
import { message } from "antd";

const DishMenu = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    menuItems,
    viewStorePagination,
    currentItem,
    viewList,
    viewModalVisible
  } = cloudState.dishMenu;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "dishMenu/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          searchData: {
            ...searchData,
            ...values
          }
        }
      });
    },
    onAdd() {
      if (menuItems !== undefined && Array.from(menuItems).length > 0) {
        dispatch({
          type: "dishMenu/showModal",
          payload: {
            modelType: "create",
            modalVisible: true
          }
        });
      } else {
        message.error("未查询到菜品信息，请前往添加");
      }
    },
    onReset() {
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          searchData: {
            menuName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["dishMenu/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "dishMenu/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onEdit(item) {
      if (menuItems !== undefined && menuItems !== []) {
        dispatch({
          type: "dishMenu/showModal",
          payload: {
            modelType: "edit",
            modelVisible: true,
            currentItem: {
              ...item
            }
          }
        });
      }
    },
    onView(item) {
      dispatch({
        type: "dishMenu/showModalView"
      });
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          currentItem: item
        }
      });
      dispatch({
        type: "dishMenu/queryRecipeCount",
        payload: {
          pkMenu: item.pkMenu,
          pageno: 1,
          rowcount: 10
        }
      });
    }
  };
  const modalProps = {
    visible: modalVisible,
    menuItems: menuItems,
    item: modelType === "create" ? {} : currentItem,
    title: modelType === "create" ? "新增菜谱" : "修改菜谱",
    onCancel() {
      dispatch({
        type: "dishMenu/hideModal"
      });
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          currentItem: {}
        }
      });
    },
    onConfirm(params) {
      if (params.pkMenu) {
        dispatch({
          type: "dishMenu/edit",
          payload: {
            ...params
          }
        });
      } else {
        dispatch({
          type: "dishMenu/add",
          payload: {
            ...params
          }
        });
      }
    }
  };
  const viewModalProps = {
    currentItem,
    viewStorePagination,
    loading: loading["dishMenu/queryRecipeCount"],
    viewList,
    viewModalVisible,
    onPageChange(page) {
      dispatch({
        type: "dishMenu/queryRecipeCount",
        payload: {
          pkMenu: currentItem.pkMenu
        }
      });
    },
    onCancel() {
      dispatch({
        type: "dishMenu/hideModalView"
      });
      dispatch({
        type: "dishMenu/updateState",
        payload: {
          currentItem: {}
        }
      });
    }
  };

  return (
    <div>
      <Search {...searchProps} />
      <List {...listProps} />
      {modalVisible ? <Modal {...modalProps} /> : ""}
      {viewModalVisible && <ViewModal {...viewModalProps} />}
    </div>
  );
};

DishMenu.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(DishMenu);
