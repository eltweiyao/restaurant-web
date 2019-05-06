import React from "react";
import PropTypes from "prop-types";
import pathToRegexp from "path-to-regexp";
import { connect } from "dva";
import { Card } from "antd";
import NProgress from "nprogress";
import { Helmet } from "react-helmet";
import { Layout, Loader } from "../components";
import "../themes/index.less";
import Error from "./error/index";
import { config, classnames } from "../utils";

const { prefix, openPages } = config;

const { Header, Bread, Footer, Sider, styles } = Layout;
let lastHref;

const App = ({ children, dispatch, restaurant, loading, location }) => {
  const {
    user,
    siderFold,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    menu,
    permissions
  } = restaurant;
  let { pathname } = location;
  pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const { logo } = config;
  const current = menu.filter(item =>
    pathToRegexp(item.route || "").exec(pathname)
  );
  let hasPermission = false;
  if (pathname === "/") {
    hasPermission = true;
  } else {
    hasPermission = current.length
      ? permissions.visit.includes(current[0].id)
      : false;
  }
  const href = window.location.href;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }
  const headerProps = {
    menu,
    user,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    checkLogin() {
      dispatch({ type: "restaurant/checkLogin" });
    },
    switchMenuPopover() {
      dispatch({ type: "restaurant/switchMenuPopver" });
    },
    switchSider() {
      dispatch({ type: "restaurant/switchSider" });
    },
    changeOpenKeys(openKeys) {
      dispatch({
        type: "restaurant/handleNavOpenKeys",
        payload: { navOpenKeys: openKeys }
      });
    },
    logout() {
      dispatch({ type: "restaurant/logOut" });
    }
  };

  const siderProps = {
    menu,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: "restaurant/switchTheme" });
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(
        `${prefix}navOpenKeys`,
        JSON.stringify(openKeys)
      );
      dispatch({
        type: "restaurant/handleNavOpenKeys",
        payload: { navOpenKeys: openKeys }
      });
    }
  };
  const breadProps = {
    menu,
    location
  };
  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        <Helmet>
          <title>连锁门店经营管理系统</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="../images/logo.png" />
          <link rel="icon" href="../images/logo.png" type="image/gif" />
        </Helmet>
        <Loader spinning={false} />
        {children}
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>连锁门店经营管理系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="../images/logo.png" />
        <link rel="icon" href="../images/logo.png" type="image/gif" />
      </Helmet>
      <div className={classnames(styles.layout, { [styles.fold]: siderFold })}>
        <aside
          className={classnames(styles.sider, { [styles.light]: !darkTheme })}
        >
          <Sider {...siderProps} />
        </aside>
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread {...breadProps} />
          <div className={styles.container}>
            <div className={styles.content}>
              <Card>{hasPermission ? children : <Error />}</Card>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  restaurant: PropTypes.object,
  loading: PropTypes.object,
  dispatch: PropTypes.func
};

export default connect(({ restaurant, loading }) => ({ restaurant, loading }))(
  App
);
