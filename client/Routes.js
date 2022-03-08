import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import CartForGuest from "./components/CartForGuest";

import AddProduct from "./components/AddProduct";

import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/products" component={AllProducts} />
            {/* <Redirect to="/products" /> */}
            <Route exact path="/products/:id" component={SingleProduct} />
            {/* <Redirect to="/products" /> */}
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/users/:userId/cart" component={Cart} />

            <Route exact path="/products" component={AddProduct} />

            <Route path="/users/:userId/checkout" component={Checkout} />
            <Route
              path="/users/:userId/confirmation"
              component={Confirmation}
            />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/products" exact component={AllProducts} />
            <Route path="/guest/cart" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
