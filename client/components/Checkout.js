import React from "react";
import { connect } from "react-redux";
import { checkout } from "../store/checkout";
import { Link } from "react-router-dom";
import { getCart } from "../store/cart";

class Checkout extends React.Component {
  constructor() {
    super();
    this.handleOrder = this.handleOrder.bind(this);
  }
  handleOrder() {
    const userId = this.props.user.id;
    this.props.checkoutDispatch(userId, { complete: true });
    this.props.clearCart();
  }
  render() {
    const { handleOrder } = this;
    const { user } = this.props;

    return (
      <div>
        <h3>
          Hi {user.firstName}, please enter an address and card number before
          ordering.
        </h3>
        <br />
        <form>
          <label htmlFor="address">Address </label>
          <input type="text" required name="address" />

          <label htmlFor="cardNumber">Card Number </label>
          <input type="text" required name="cardNumber" />
        </form>
        <Link to={`/users/${user.id}/confirmation`}>
          <button className="add" onClick={handleOrder}>
            Order
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    checkoutState: state.checkout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkoutDispatch: (userId, item) => dispatch(checkout(userId, item)),
    clearCart: () => dispatch(getCart({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
