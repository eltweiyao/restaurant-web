import React, { PropTypes } from "react";
import { connect } from "dva";
import LoginInfo from "../components/Login/page";
import { routerRedux } from 'dva/router';


const Login = ({ cloudState, dispatch }) => {
  const { username, password } = cloudState.login;
  const loading = cloudState.loading.effects;
  const loginInfo = {
    loading: loading["login/login"],
    username,
    password,
    onPage(route){
      dispatch(
        routerRedux.push("/register"),
      );
      return true;
    },
    onLogin(values) {
      dispatch({
        type: "login/login",
        payload: {
          account: values.username,
          password: values.password
        }
      });
    }
  };
  return (
    <div>
      <LoginInfo {...loginInfo} />
    </div>
  );
};

Login.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Login);
