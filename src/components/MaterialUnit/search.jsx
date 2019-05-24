/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 10:08:34
 */

import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Tree, Button } from "antd";
import Input from "../common/Input";

const FormItem = Form.Item;

const search = ({
  searchData,
  onSearch,
  onReset,
  onAdd,
  form: { resetFields, getFieldDecorator, getFieldsValue }
}) => {
  const handleSearch = () => {
    const data = getFieldsValue();
    onSearch(data);
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
            <FormItem label="单位名称">
              {getFieldDecorator("unitName", {
                initialValue: searchData.unitName
              })(
                <Input clearbtn="true" type="text" placeholder="输入单位名称" />
              )}
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
                新增单位
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
