/* @Author: cuiweiyao
 * @Date: 2019-01-17 22:34:48
 * @Last Modified by: cuiweiyao
 * @Last Modified time: 2019-02-21 15:55:54
 */
import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, TreeSelect } from "antd";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const { Text } = Input;

const modal = ({
  loading,
  item,
  visible,
  title,
  form: { getFieldDecorator, validateFields, getFieldsValue, resetFields },
  onCancel,
  onConfirm,
  menuItems
}) => {
  const handleSubmit = () => {
    validateFields(errors => {
      const data = {
        ...getFieldsValue()
      };

      if (!errors) {
        console.log("confirm", item);
        onConfirm({
          pkMenu: item.pkMenu,
          ...data
        });
      }
    });
  };
  const modalProps = {
    maskClosable: false,
    visible,
    title: title,
    cancelText: "取消",
    okText: "保存",
    onOk: handleSubmit,
    confirmLoading: loading,
    menuItems,
    onCancel,
    afterClose: () => resetFields()
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  const loopTree = data =>
    data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            title={item.value}
            key={item.key}
            value={item.key}
            dataRef={item}
          >
            {loopTree(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={item.value}
          key={item.key}
          value={item.key}
          dataRef={item}
        />
      );
    });
  return (
    <Modal {...modalProps}>
      <Form>
        <FormItem {...formLayout} label="名称：">
          {getFieldDecorator("menuName", {
            initialValue: item.menuName,
            rules: [
              {
                required: true,
                message: "请输入菜谱名称"
              },
              {
                whitespace: true,
                message: "不能只输入空格"
              },
              {
                max: 5,
                message: "最大输入5个字符"
              }
            ]
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="限制50字以内"
            />
          )}
        </FormItem>
        <FormItem {...formLayout} label="菜品">
          {getFieldDecorator("pkRecipes", {
            initialValue: item.pkRecipes,
            rules: [
              {
                required: true,
                message: "请选择单位"
              }
            ]
          })(
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeCheckable="true"
              style={{ width: "100%" }}
              placeholder="请选择"
            >
              {loopTree(menuItems === undefined ? [] : menuItems)}
            </TreeSelect>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};
modal.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

export default Form.create()(modal);
