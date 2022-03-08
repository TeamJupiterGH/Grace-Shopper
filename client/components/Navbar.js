import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";

class Navbar extends React.Component {
  render() {
    const { handleClick, isLoggedIn, userId, itemsInCart } = this.props;
    const productArr = itemsInCart.products || [];

    let totalItemsInCart = 0;
    for (let i = 0; i < productArr.length; i++) {
      totalItemsInCart += productArr[i].order_details.quantity;
    }

    const numberOfItemsInCart =
      JSON.parse(localStorage.getItem("tempCart")) || [];
    const numberOfItemsInCartLength = numberOfItemsInCart.length;

    return (
      <div>
        <h1>Half Baked</h1>
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/products">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to={`/users/${userId}/cart`}>Cart({totalItemsInCart})</Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/guest/cart">Cart ({numberOfItemsInCartLength})</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    itemsInCart: state.itemsInCart,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
