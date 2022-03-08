import React from 'react';
import { connect } from 'react-redux';
import { checkout } from '../store/checkout';
import { Link } from 'react-router-dom';
import { getCart } from '../store/cart';

class Checkout extends React.Component {
  constructor() {
    super();
    this.handleOrder = this.handleOrder.bind(this);
  }

  componentDidMount() {
    console.log('this is props!', this.props);
  }
  handleOrder() {
    const userId = this.props.user.id;
    console.log(this.props);
    this.props.checkoutDispatch(userId, { complete: true });
    this.props.clearCart();
  }
  render() {
    const { handleOrder } = this;
    const { user } = this.props;

    if (user.firstName) {
      return (
        <div>
          <h3>
            Hi {user.firstName}, please enter address and card number before
            ordering.
          </h3>
          <br />
          <form>
            <label htmlFor='address'>Address </label>
            <input type='text' required name='address' />

            <label htmlFor='cardNumber'>Card Number </label>
            <input type='text' required name='cardNumber' />
          </form>
          <Link to={`/users/${user.id}/confirmation`}>
            <button onClick={handleOrder}>Order</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Ordering with us for the first time?</h3>
          <h3>Please fill out the forms below:</h3>
          <form>
          <label htmlFor='firstName'>First Name </label>
            <input type='text' required name='firstName' />

            <label htmlFor='lastName'>Last Name </label>
            <input type='text' required name='lastName' />

            <label htmlFor='email'>Email</label>
            <input type='text' required name='email' />

            <label htmlFor='address'>Address </label>
            <input type='text' required name='address' />

            <label htmlFor='cardNumber'>Card Number </label>
            <input type='text' required name='cardNumber' />
          </form>
          <Link to={`/guest/cart/confirmation`}>
            <button onClick={handleOrder}>Order</button>
          </Link>
        </div>
      );
    }
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
