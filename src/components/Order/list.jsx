/*
 * @Author: cuiweiyao
 * @Date: 2019-04-12 09:45:00
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "../../common/common.less";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Tabs,
  Card,
  Affix,
  Icon
} from "antd";

const { TabPane } = Tabs;
const { Meta } = Card;
const { Text } = Input;
const FormItem = Form.Item;
const list = ({
  dataList,
  result,
  price,
  onConfirm,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue
  }
}) => {
  const cardStyle = {
    width: "180px",
    height: "280px",
    margin: "10px",
    float: "left",
    textAlign: "center"
  };
  const cardHeadStyle = {
    height: "150px"
  };
  const cardBodyStyle = {
    height: "30px"
  };
  const tabPaneStyle = {
    overflow: "auto"
  };
  const inputStyle = {
    width: "40px"
  };
  const handleOk = () => {
    var data = [];
    for (var key in result) {
      if (result[key].recipeCount !== 0) {
        data.push(result[key]);
      }
    }
    onConfirm(data);
    for (var key in result) {
      document.getElementById(key).value = 0;
    }
    setFieldsValue({ totalPrice: 0 });
  };

  const loopCard = data =>
    data.map(item => {
      let count = 0;
      const cardActions = [
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="minus"
          onClick={() => {
            const {totalPrice} = getFieldsValue();
            count = result[item.pkRecipe] ? (result[item.pkRecipe].recipeCount || 0) : 0;
            price = Number(totalPrice).toFixed(2);
            if (count <= 0) {
              count = 0;
            } else {
              count = count - 1;
              price = Number(price) - Number(item.recipePrice);
            }
            setFieldsValue({ totalPrice: Number(price).toFixed(2)});
            data = {
              pkRecipe: item.pkRecipe,
              recipeName: item.recipeName,
              recipePrice: item.recipePrice,
              recipeCount: count
            };
            result[item.pkRecipe] = data;
          }}
        />,
        <Input
          type={Text}
          style={inputStyle}
          value={result[item.pkRecipe] ? (result[item.pkRecipe].recipeCount || 0) : 0}
          disabled
        />,
        <Button
          type="primary"
          size="small"
          shape="circle"
          icon="plus"
          onClick={() => {
            const {totalPrice} = getFieldsValue();
            count = result[item.pkRecipe] ? (result[item.pkRecipe].recipeCount || 0) : 0;
            price = Number(totalPrice).toFixed(2);
            if (count >= 99) {
              count = 99;
            } else {
              count = count + 1;
              price = Number(price) + Number(item.recipePrice);
            }
            setFieldsValue({ totalPrice: Number(price).toFixed(2)});
            data = {
              pkRecipe: item.pkRecipe,
              recipeName: item.recipeName,
              recipePrice: item.recipePrice,
              recipeCount: count
            };
            result[item.pkRecipe] = data;
          }}
        />
      ];
      return (
        <Card
          hoverable
          size="small"
          style={cardStyle}
          actions={cardActions}
          cover={
            <img
              style={cardHeadStyle}
              alt="restaurant"
              src={item.imageUrl || ""}
            />
          }
        >
          <Meta
            style={cardBodyStyle}
            title={item.recipeName}
            description={"￥" + Number(item.recipePrice).toFixed(2)}
          />
          <div />
        </Card>
      );
    });
  const loopTabPane = data =>
    data.map(item => (
      <TabPane
        style={tabPaneStyle}
        tab={item.categoryName}
        key={item.pkCategory}
      >
        {loopCard(item.recipes)} 
      </TabPane>
    ));

  return (
    <div>
      <div
        style={{
          height: window.document.body.clientHeight - 250,
          width: window.document.body.clientWidth - 500
        }}
      >
        <Tabs defaultActiveKey="1" tabPosition="left">
          {loopTabPane(dataList)}
        </Tabs>
      </div>
      <div
        style={{
          marginBottom: "150px",
          marginRight: "200px"
        }}
      >
        <Affix offsetBottom={150} className="affix">
          <Form layout="horizontal">
            <FormItem>
              {getFieldDecorator("totalPrice", {
                initialValue: price
              })(
                <InputNumber
                  className={styles.orderInput}
                  precision={2}
                  disabled
                  formatter={value => `应收：￥ ${value}`}
                />
              )}
            </FormItem>

            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={handleOk}
            >
              结算
            </Button>
          </Form>
        </Affix>
      </div>
    </div>
  );
};

list.propTypes = {
  loading: PropTypes.bool,
  dataList: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onApply: PropTypes.func
};
export default Form.create()(list);
