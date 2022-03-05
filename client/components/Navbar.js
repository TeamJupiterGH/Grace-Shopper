import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, userId, itemsInCart }) => {
  const productArr = itemsInCart.products || [];

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
            <Link to={`/users/${userId}/cart`}>Cart({productArr.length})</Link>
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
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    itemsInCart: state.itemsInCart,
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
