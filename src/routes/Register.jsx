import React, { PropTypes } from "react";
import { connect } from "dva";
import LoginInfo from "../components/Register/page";
import { routerRedux } from 'dva/router';


const Register = ({ cloudState, dispatch }) => {
  // const { username, password } = cloudState.register;
  const loading = cloudState.loading.effects;
  const loginInfo = {
    loading: loading["register/register"],
    onPage(){
      dispatch(
        routerRedux.push("/login"),
      );
    },
    onRegister(values) {
      console.log(values);
      dispatch({
        type: "register/register",
        payload: {
          account: values.username,
          password: values.password,
          companyName: values.companyName
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

Register.propTypes = {
  cloudState: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(cloudState) {
  return { cloudState };
}

export default connect(mapStateToProps)(Register);
