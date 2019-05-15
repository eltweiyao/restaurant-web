/* @Author: cuiweiyao
 * @Date: 2019-01-17 22:34:48
 * @Last Modified by: cuiweiyao
 * @Last Modified time: 2019-02-21 15:55:54
 */
import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Select, Cascader } from "antd";
import city from "../../utils/city";

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
  menus
}) => {
  const handleSubmit = () => {
    validateFields(errors => {
      const formValues = {
        ...getFieldsValue()
      };
      const data = {
        ...getFieldsValue(),
        storePosition: formValues.storePosition.join("-")
      };

      if (!errors) {
        onConfirm({
          pkStore: item.pkStore,
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
    menus,
    onCancel,
    afterClose: () => resetFields()
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };

  const loopMenu = data =>
    data.map(item => (
      <Option key={item.pkMenu} value={item.pkMenu}>
        {item.menuName}
      </Option>
    ));
  return (
    <Modal {...modalProps}>
      <Form layout="horizontal">
        <FormItem {...formLayout} label="名称">
          {getFieldDecorator("storeName", {
            initialValue: item.storeName,
            rules: [
              {
                required: true,
                message: "请输入门店名称"
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
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="请输入门店名称"
            />
          )}
        </FormItem>
        <FormItem label="门店位置"  {...formLayout}>
          {getFieldDecorator("storePosition", {
            initialValue:
              title === "新增门店"
                ? item.storePosition
                : item.storePosition.split("-"),
            rules: [
              {
                required: true,
                message: "门店位置不能为空"
              }
            ]
          })(<Cascader options={city} placeholder="请选择门店位置" />)}
        </FormItem>
        <FormItem label="详细地址"  {...formLayout}>
          {getFieldDecorator("detailAddress", {
            initialValue: item.detailAddress,
            rules: [
              {
                required: true,
                message: "门店详细地址不能为空"
              },
              {
                pattern: /^[a-zA-Z0-9\u4e00-\u9fa5\\-]+$/,
                message: "请输入汉字、字母、数字或减号"
              },
              {
                max: 40,
                message: "最长40个字符"
              }
            ]
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="请输入门店详细位置"
            />
          )}
        </FormItem>
        <FormItem {...formLayout} label="联系人">
          {getFieldDecorator("contactName", {
            initialValue: item.contactName,
            rules: [
              {
                required: true,
                message: "联系人不能为空"
              },
              {
                pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/,
                message: "请输入汉字或字母"
              },
              {
                max: 10,
                message: "最长10个字符"
              }
            ]
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="请输入联系人姓名"
            />
          )}
        </FormItem>
        <FormItem {...formLayout} label="菜谱">
          {getFieldDecorator("pkMenu", {
            initialValue: item.pkMenu,
            rules: [
              {
                required: true,
                message: "请选择菜谱"
              }
            ]
          })(<Select placeholder="请选择所用菜谱">{loopMenu(menus)}</Select>)}
        </FormItem>
        <FormItem {...formLayout} label="门店账号">
          {getFieldDecorator("account", {
            initialValue: item.account,
            rules: [
              {
                required: true,
                message: "账号不能为空"
              },
              {
                pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                message: "请输入正确格式的手机号"
              },
              {
                max: 20,
                message: "最长20个字符"
              }
            ]
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="请输入账号"
            />
          )}
        </FormItem>
        <FormItem {...formLayout} label="密码">
          {getFieldDecorator("password", {
            initialValue: item.password,
            rules: [
              {
                required: true,
                message: "请输入密码"
              }
            ]
          })(
            <Input
              type={Text}
              className="font12"
              style={{ width: "100%" }}
              placeholder="请输入密码"
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
