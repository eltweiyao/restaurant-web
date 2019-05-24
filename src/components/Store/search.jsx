/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 10:08:34
 */

import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Cascader, Button } from "antd";
import Input from "../common/Input";
import city from "../../utils/city";

const FormItem = Form.Item;

const search = ({
  searchData,
  onSearch,
  onReset,
  onAdd,
  form: { resetFields, getFieldDecorator, getFieldsValue, validateFields }
}) => {
  const handleSearch = () => {
    validateFields(errors => {
      const formValues = {
        ...getFieldsValue()
      };
      var storePosition = formValues ? formValues.storePosition || "" : "";
      const data = {
        ...getFieldsValue(),
        storePosition: storePosition.join("-")
      };
      if (!errors) {
        onSearch(data);
      }
    });
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  };
  // 清空搜所条件*/
  const handleReset = () => {
    resetFields();
    onReset();
  };
  return (
    <div className="components-search search">
      <Form layout="inline">
        <Row>
          <Col span={8} xxl={6}>
            <FormItem label="门店名称：">
              {getFieldDecorator("storeName", {
                initialValue: searchData.storeName
              })(
                <Input clearbtn="true" type="text" placeholder="输入门店名称" />
              )}
            </FormItem>
          </Col>
          <Col span={10} xxl={6}>
            <FormItem label="门店位置：" {...formLayout}>
              {getFieldDecorator("storePosition", {
                initialValue:
                  typeof searchData.storePosition === "undefined"
                    ? searchData.storePosition
                    : searchData.storePosition.split("-")
              })(<Cascader options={city} placeholder="请选择门店位置" />)}
            </FormItem>
          </Col>
          <Col md={24} lg={24} xl={24} xxl={12} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={handleSearch}
              style={{ marginRight: "10px", marginBottom: "16px" }}
            >
              搜索
            </Button>
            <Button onClick={handleReset}>清除条件</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem>
              <Button
                type="default"
                style={{ margin: "0" }}
                onClick={() => onAdd()}
              >
                新增门店
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

search.propTypes = {
  selectedIds: PropTypes.array,
  searchData: PropTypes.object,
  form: PropTypes.object,
  treeData: PropTypes.array,
  onSearch: PropTypes.func,
  onSelectTree: PropTypes.func,
  onReset: PropTypes.func,
  onOpenChange: PropTypes.func,
  onCalendarChange: PropTypes.func
};

export default Form.create()(search);
