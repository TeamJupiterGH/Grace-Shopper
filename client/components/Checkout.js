import React from "react";
import { connect } from "react-redux";
import { checkout } from "../store/checkout";

class Checkout extends React.Component {
  constructor() {
    super();
    this.handleOrder = this.handleOrder.bind(this);
  }
  handleOrder() {
    const userId = this.props.user.id;
    this.props.checkoutDispatch(userId, { complete: true });
  }
  render() {
    const { handleOrder } = this;
    const { user } = this.props;
    console.log("USER", this.props.user);
    return (
      <div>
        <div>
          Hi {user.firstName} {user.lastName}, please enter address and card
          number before ordering.
        </div>
        <br />
        <form>
          <label htmlFor="address">Address </label>
          <input type="text" required name="address" />

          <label htmlFor="cardNumber">Card Number </label>
          <input type="text" required name="cardNumber" />
        </form>
        <button onClick={handleOrder}>Order</button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
