/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Order/list";

const Order = ({ cloudState, dispatch }) => {
  const { dataList, result } = cloudState.order;
  const loading = cloudState.loading.effects;

  const listProps = {
    loading: loading["order/query"],
    dataList,
    result,
    totalPrice: 0,
    onConfirm(result) {
      dispatch({
        type: "order/createOrder",
        payload: {
          orders: result
        }
      });
    }
  };

  return (
    <div>
      <List {...listProps} />
    </div>
  );
};

Order.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Order);
