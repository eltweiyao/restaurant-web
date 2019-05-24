import React, { PropTypes } from "react";
import { Button, Row, Form, Input } from "antd";
import { config } from "../../utils";
import styles from "../../common/login.less";

const FormItem = Form.Item;

const page = ({
  loading,
  username,
  password,
  onRegister,
  onPage,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue}
}) => {
  const handleSubmit = () => {
    validateFields({ force: true }, (err, values) => {
      if (!err) {
          onRegister(values);
      }
    });
  };
  const passwordValidator = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！')
    }

    // 必须总是返回一个 callback，否则 validateFields 无法响应
    callback();
  };
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span className={styles.imgs} />
        <span>{config.name}</span>
      </div>
      <Form>
        <FormItem>
          {getFieldDecorator("username", {
            initialValue: username,
            rules: [
              {
                required: true,
                message: "请输入用户名"
              }
            ]
          })(
            <Input
              onPressEnter={handleSubmit}
              size="large"
              placeholder="用户名"
            />
          )}
        </FormItem>
        <FormItem>
        {getFieldDecorator("companyName", {
            rules: [
              {
                required: true,
                message: "请输入企业名称"
              },
              {
                whitespace: true,
                message: "不能只输入空格"
              },
              {
                max: 50,
                message: "最多输入50个字"
              }
            ]
          })(
            <Input
              onPressEnter={handleSubmit}
              size="large"
              placeholder="企业名称"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            initialValue: password,
            rules: [
              {
                required: true,
                message: "请输入密码"
              },
              {
                
              }
            ]
          })(
            <Input
              onPressEnter={handleSubmit}
              size="large"
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("confirm", {
            initialValue: password,
            rules: [
              {
                required: true,
                message: "请确认密码"
              },
              {
                validator: passwordValidator
              }
            ]
          })(
            <Input
              onPressEnter={handleSubmit}
              size="large"
              type="password"
              placeholder="确认密码"
            />
          )}
        </FormItem>
        <Row>
          <FormItem>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={loading}
            >
              注册
            </Button>
          </FormItem>
          <Button
              type="link"
              onClick={() => onPage()}
              >返回</Button>
          <p>
            <span>{config.footerText}</span>
          </p>
        </Row>
      </Form>
    </div>
  );
};

page.propTypes = {
  loading: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  form: PropTypes.object,
  onLogin: PropTypes.func
};

export default Form.create()(page);
