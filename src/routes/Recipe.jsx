/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Recipe/list";
import Search from "../components/Recipe/search";
import Modal from "../components/Recipe/modal";
import { message } from "antd";

const Recipe = ({ cloudState, dispatch }) => {
  const {
    searchData,
    startValue,
    modelType,
    title,
    dataList,
    pagination,
    selectedIds,
    modalVisible,
    materials,
    currentItem,
    pkRecipe,
    categories,
    previewImage,
    previewVisible,
    buttonVisible,
    imageUrl
  } = cloudState.recipe;
  const loading = cloudState.loading.effects;
  const searchProps = {
    searchData,
    selectedIds,
    startValue,
    onSearch(values) {
      dispatch({
        type: "recipe/query",
        payload: {
          ...values,
          pageno: pagination.current,
          rowcount: pagination.pageSize
        }
      });
      dispatch({
        type: "recipe/updateState",
        payload: {
          searchData: {
            ...searchData,
            ...values
          }
        }
      });
    },
    onAdd() {
      if (
        materials !== undefined &&
        Array.from(materials).length > 0 &&
        (categories !== undefined && Array.from(categories).length > 0)
      ) {
        dispatch({
          type: "recipe/showModal",
          payload: {
            modelType: "addRecipe",
            modalVisible: true
          }
        });
      } else {
        message.error("未查询到物料或类别信息，请前往添加");
      }
    },
    onReset() {
      dispatch({
        type: "recipe/updateState",
        payload: {
          searchData: {
            recipeName: ""
          }
        }
      });
    }
  };

  const listProps = {
    loading: loading["recipe/query"],
    dataList,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "recipe/updateState",
        payload: {
          searchData: {
            ...searchData,
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "recipe/query",
        payload: {
          ...searchData,
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onAddMaterial(item) {
      dispatch({
        type: "recipe/showModal",
        payload: {
          modelType: "addRecipeMaterial",
          title: "添加所用物料",
          modelVisible: true,
          currentItem: {
            ...item
          }
        }
      });
    },
    onEditRecipeName(item) {
      console.log("item", item);
      dispatch({
        type: "recipe/showModal",
        payload: {
          modelType: "updateRecipeInfo",
          title: "修改菜品信息",
          modelVisible: true,
          buttonVisible: false,
          currentItem: {
            ...item
          }
        }
      });
    },
    onEditMaterial(pkRecipe, item) {
      dispatch({
        type: "recipe/showModal",
        payload: {
          modelType: "updateRecipeMaterial",
          title: "修改所用物料",
          modelVisible: true,
          pkRecipe: pkRecipe,

          currentItem: {
            ...item
          }
        }
      });
    },
    onDeleteRecipe(pkRecipe) {
      dispatch({
        type: "recipe/deleteRecipe",
        payload: {
          pkRecipe: pkRecipe
        }
      });
    },
    onDeleteRecipeMaterial(pkRecipe, pkMaterial) {
      dispatch({
        type: "recipe/deleteRecipeMaterial",
        payload: {
          pkRecipe: pkRecipe,
          pkMaterial: pkMaterial
        }
      });
    }
  };
  const modalProps = {
    visible: modalVisible,
    materials: materials,
    categories: categories,
    item: modelType === "addRecipe" ? {} : currentItem,
    title: modelType === "addRecipe" ? "新增配方" : title,
    pkRecipe: pkRecipe || "",
    previewImage: previewImage,
    previewVisible: previewVisible,
    buttonVisible: buttonVisible,
    imageUrl: imageUrl,
    onCancel() {
      dispatch({
        type: "recipe/hideModal"
      });
      dispatch({
        type: "recipe/updateState",
        payload: {
          currentItem: {},
          previewVisible: false,
          buttonVisible: false,
          imageUrl: ""
        }
      });
    },
    onConfirm(params) {
      dispatch({
        type: `recipe/${modelType}`,
        payload: {
          ...params
        }
      });
      dispatch({
        type: "recipe/updateState",
        payload: {
          currentItem: {},
          previewVisible: false,
          buttonVisible: false,
          imageUrl: ""
        }
      });
    },
    onPreview(params) {
      dispatch({
        type: "recipe/updateState",
        payload: {
          ...params
        }
      });
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

Recipe.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Recipe);
