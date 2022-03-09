import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { fetchCart } from "../store/cart";

class Navbar extends React.Component {
  
  componentDidMount() {
    console.log('mounted');
  }

  // console.log('this.props in navbarrr!', this.props)
  componentDidUpdate(prevProp) {
    if (prevProp.userId !== this.props.userId) {
      this.props.fetchCart(this.props.userId);
    }
  }
  render() {
    console.log("USER ID IN NAV BAR RENDER", this.props);
    const { handleClick, isLoggedIn, userId, itemsInCart, user } = this.props;
    const productArr = itemsInCart.products || [];

    let totalItemsInCart = 0;
    for (let i = 0; i < productArr.length; i++) {
      totalItemsInCart += productArr[i].order_details.quantity;
    }

    const numberOfItemsInCart =
      JSON.parse(localStorage.getItem("tempCart")) || [];
    const numberOfItemsInCartLength = numberOfItemsInCart.length;

    return (
      <div className="main">
        <img src="https://i.imgur.com/U0V6pXZ.png" className="logo" />
        <nav>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/products">
                <span className="tab">Home</span>
              </Link>
              <span href="#" onClick={handleClick} className="tab">
                Logout
              </span>
              <Link to={`/users/${userId}/cart`}>
                <span className="tab">Cart({totalItemsInCart})</span>
              </Link>
              <span className="greeting"> Welcome, {user.firstName}!</span>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products">
                <span className="tab">Home</span>
              </Link>
              <Link to="/login">
                <span className="tab">Login</span>
              </Link>
              <Link to="/signup">
                <span className="tab">Sign Up</span>
              </Link>
              <Link to="/guest/cart">
                <span className="tab">Cart ({numberOfItemsInCartLength})</span>
                {/* <span className="tab">Cart ({numberOfItemsInCartLength})</span> */}
              </Link>
            </div>
          )}
        </nav>
        {/* <hr /> */}
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
    guestId: state.guestCheckout,
    user: state.auth,
    itemsInCart: state.itemsInCart,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    fetchGuestCart: (guestId) => dispatch(fetchGuestCart(guestId))
  };
};

export default connect(mapState, mapDispatch)(Navbar);
