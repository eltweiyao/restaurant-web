/**
 * Created by yunbaoyuan on 2017/9/4.
 */
import React from "react";
import PropTypes from "prop-types";
import RouterConfig from "../router";
import Login from "./Login";
import Material from "./Material";
import MaterialUnit from "./MaterialUnit";
import Recipe from "./Recipe";
import Category from "./Category";
import DishMenu from "./DishMenu";
import Store from "./Store";
import Order from "./Order";
import Dashboard from "./Dashboard";

const Router = ({ history, app }) => {
  const routes = [
    {
      path: "/login",
      component: Login
    },
    {
      path: "/materialUnit",
      component: MaterialUnit
    },
    {
      path: "/material",
      component: Material
    },
    {
      path: "/recipe",
      component: Recipe
    },
    {
      path: "/category",
      component: Category
    },
    {
      path: "/dishmenu",
      component: DishMenu
    },
    {
      path: "/store",
      component: Store
    },
    {
      path: "/order",
      component: Order
    },
    {
      path: "/dashboard",
      component: Dashboard
    }
  ];
  const routerProps = {
    history,
    app,
    routes
  };

  return <RouterConfig {...routerProps} />;
};

Router.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Router;
