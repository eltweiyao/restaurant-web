/* @Author: cuiweiyao
 * @Date: 2019-01-17 22:34:48
 * @Last Modified by: cuiweiyao
 * @Last Modified time: 2019-02-21 15:55:54
 */
import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Select, Input } from "antd";

const Option = Select.Option;
const FormItem = Form.Item;
const { Text } = Input;

const modal = ({
  loading,
  item,
  visible,
  title,
  form: { getFieldDecorator, validateFields, getFieldsValue, resetFields },
  onCancel,
  onConfirm
}) => {
  const handleSubmit = () => {
    validateFields(errors => {
      const data = {
        ...getFieldsValue()
      };

      if (!errors) {
        onConfirm({
          pkCategory: item.pkCategory,
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
    onCancel,
    afterClose: () => resetFields()
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };
  return (
    <Modal {...modalProps}>
      <Form layout="horizontal">
        <FormItem {...formLayout} label="类别名称">
          {getFieldDecorator("categoryName", {
            initialValue: item.categoryName,
            rules: [
              {
                required: true,
                message: "请输入类别名称"
              },
              {
                whitespace: true,
                message: "不能只输入空格"
              },
              {
                max: 20,
                message: "最多输入20个字"
              }
            ]
          })(<Input type={Text} placeholder="请输入类别名称" />)}
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
