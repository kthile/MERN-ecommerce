import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./hoc/Layout";
import Auth from "./hoc/Auth";

//Public Routes
import RegisterLogin from "./components/register_login/Register_Login"
import Register from "./components/register_login/Register";
import Error404 from "./components/error/Error404";
import Shop from './components/shop/Shop';
import Product from './components/product/Product'
import Loading from './components/loading_screen/Loading'

//Private Routes
import UserDashboard from "./components/user/UserDashboard";
import AddProduct from "./components/user/admin/AddProduct"
import ManageCategories from "./components/user/admin/ManageCategories"
import UserCart from './components/user/UserCart'
import UpdateProfile from './components/user/admin/UpdateProfile'
import ManageSite from './components/user/admin/ManageSite'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/user/dashboard" component={Auth(UserDashboard, true)} />
        <Route exact path="/user/cart" component={Auth(UserCart, true)} />
        <Route exact path="/user/user_profile" component={Auth(UpdateProfile, true)} />
        <Route exact path="/admin/add_product" component={Auth(AddProduct, true)} />
        <Route exact path="/admin/manage_categories" component={Auth(ManageCategories, true)} />
        <Route exact path="/admin/site_info" component={Auth(ManageSite, true)} />


        <Route exact path="/" component={Auth(Home, null)} />
        <Route exact path="/shop" component={Auth(Shop, null)} />
        <Route exact path="/product_detail/:id" component={Auth(Product, null)} />
        <Route exact path="/register_login" component={Auth(RegisterLogin, false)} />
        <Route exact path="/register" component={Auth(Register, false)} /> 
        <Route component={Error404} />
      </Switch>
    </Layout>
  );
};

export default Routes;
