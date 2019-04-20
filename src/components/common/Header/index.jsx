import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "antd";
import styles from "./Header.less";
import { getSession } from "../../../utils";

const SubMenu = Menu.SubMenu;

const Header = ({ logout, switchSider, siderFold }) => {
  const handleClickMenu = e => {
    if (e.key === "logout") {
      logout();
    }
  };
  // 检测登陆
  if (!getSession("pkCompany")) {
    window.location = "/index.html#/login";
  }

  return (
    <div className={styles.header}>
      <button
        className="btn-link"
        onClick={switchSider}
        style={{ marginLeft: "10px" }}
      >
        <Icon type={siderFold ? "menu-unfold" : "menu-fold"} />
      </button>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: "right"
            }}
            title={
              <span>
                {getSession("accountType") === "1"
                  ? getSession("companyName")
                  : getSession("companyName") + "  " + getSession("storeName")}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Icon type="user" />
                {getSession("account")}
              </span>
            }
          >
            <Menu.Item key="logout">
              <a rel="noopener noreferrer" href="#/login">
                <Icon type="logout" />
                退出登陆
              </a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool
};

export default Header;
