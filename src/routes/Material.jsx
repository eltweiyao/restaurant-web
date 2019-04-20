/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Material/list";
import Search from "../components/Material/search";
import Modal from "../components/Material/modal";
import { message } from "antd";

const Material = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    materialUnits,
    currentItem
  } = cloudState.material;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "material/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "material/updateState",
        payload: {
          searchData: {
            ...searchData,
            ...values
          }
        }
      });
    },
    onAdd() {
      if (materialUnits !== undefined && Array.from(materialUnits).length > 0) {
        dispatch({
          type: "material/showModal",
          payload: {
            modelType: "create",
            modalVisible: true
          }
        });
      } else {
        message.error("未查询到物料单位，请前往添加");
      }
    },
    onReset() {
      dispatch({
        type: "material/updateState",
        payload: {
          searchData: {
            materialName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["material/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "material/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "material/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onEdit(item) {
      dispatch({
        type: "material/showModal",
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
    materialUnits: materialUnits,
    item: modelType === "create" ? {} : currentItem,
    title: modelType === "create" ? "新增原料" : "修改原料",
    onCancel() {
      dispatch({
        type: "material/hideModal"
      });
      dispatch({
        type: "material/updateState",
        payload: {
          currentItem: {}
        }
      });
    },
    onConfirm(params) {
      if (params.pkMaterial) {
        dispatch({
          type: "material/edit",
          payload: {
            ...params
          }
        });
      } else {
        dispatch({
          type: "material/add",
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

Material.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Material);
