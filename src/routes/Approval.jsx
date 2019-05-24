/*
 * @Author: cuiweiyao
 * @Date: 2019-01-17 17:31:33
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import List from "../components/Approval/list";

const Approval = ({ cloudState, dispatch }) => {
  const {
    dataList,
    accountType,
    pagination
  } = cloudState.approval;
  const loading = cloudState.loading.effects;

  const listProps = {
    loading: loading["approval/query"],
    dataList,
    accountType,
    pagination,
    onPageChange(page) {
      dispatch({
        type: "approval/updateState",
        payload: {
          searchData: {
            pageno: page.current,
            rowcount: page.pageSize
          }
        }
      });
      dispatch({
        type: "approval/query",
        payload: {
          pageno: page.current,
          rowcount: page.pageSize
        }
      });
    },
    onAgree(item) {
      dispatch({
        type: "approval/agree",
        payload: {
          pkCompany: item
        }
      });
    },
    onReject(item) {
      dispatch({
        type: "approval/reject",
        payload: {
          pkCompany: item
        }
      });
    }
  };
  console.log("accountType", accountType);
  return (
    <div>
      {accountType === "3" ? "请联系管理员授权账户" : <List {...listProps} />}
    </div>
  );
};

Approval.propTypes = {
  dispatch: PropTypes.func,
  cloudState: PropTypes.object
};

const mapStateToProps = cloudState => ({ cloudState });

export default connect(mapStateToProps)(Approval);
