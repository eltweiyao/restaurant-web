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
  onConfirm,
  materialUnits
}) => {
  const handleSubmit = () => {
    validateFields(errors => {
      const data = {
        ...getFieldsValue()
      };

      if (!errors) {
        onConfirm({
          pkMaterial: item.pkMaterial,
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
    materialUnits,
    onCancel,
    afterClose: () => resetFields()
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };
  const loopState = data =>
    data.map(item => (
      <Option key={item.pkUnit} value={item.pkUnit}>
        {item.unitName}
      </Option>
    ));
  return (
    <Modal {...modalProps}>
      <Form>
        <FormItem {...formLayout} label="名称：">
          {getFieldDecorator("materialName", {
            initialValue: item.materialName,
            rules: [
              {
                required: true,
                message: "请输入单位名称"
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
        <FormItem {...formLayout} label="单位">
          {getFieldDecorator("pkUnit", {
            initialValue: item.pkUnit,
            rules: [
              {
                required: true,
                message: "请选择单位"
              }
            ]
          })(
            <Select style={{ width: "100%" }} placeholder="请选择">
              {loopState(materialUnits === undefined ? [] : materialUnits)}
            </Select>
          )}
        </FormItem>
        <FormItem {...formLayout} label="单价">
          {getFieldDecorator("materialPrice", {
            initialValue: item.materialPrice,
            rules: [
              {
                required: true,
                message: "输入金额"
              },
              {
                pattern: /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/,
                message: "金额格式有误"
              }
            ]
          })(
            <Input
              className="font12"
              style={{ width: "100%" }}
              placeholder="单价"
            />
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
