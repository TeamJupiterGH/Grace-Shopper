import React from 'react';
import { connect } from 'react-redux';
import { checkout } from '../store/checkout';
import { Link } from 'react-router-dom';
import { getCart } from '../store/cart';
import { guestCheckout } from '../store/guestCheckout'

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleGuestOrder = this.handleGuestOrder.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  componentDidMount() {
    console.log('this is props in checkout!', this.props);
  }
  
  handleOrder() {
    const userId = this.props.user.id;
    this.props.checkoutDispatch(userId, { complete: true });
    this.props.clearCart();
  }
  

  handleGuestOrder(evt) {
    const { firstName, lastName, email } = this.state;
    this.props.dispatchSubmit(firstName, lastName, email)
    // localStorage.clear();
    // this.props.clearGuestCart();
  }
  

  render() {
    const { handleOrder, handleGuestOrder, handleChange, handleSubmit } = this;
    const { user } = this.props;
    const { firstName, lastName, email } = this.state;
    console.log('this is props in render!', this.props);


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
          <form onSubmit= {handleSubmit}>
          <label htmlFor='firstName'>First Name </label>
          <input name="firstName" required onChange={handleChange} value={firstName} />

            <label htmlFor='lastName'>Last Name </label>
            <input name="lastName" required onChange={handleChange} value={lastName} />

            <label htmlFor='email'>Email</label>
            <input name="email" required onChange={handleChange} value={email} />

            <label htmlFor='address'>Address </label>
            <input type='text' required name='address' />

            <label htmlFor='cardNumber'>Card Number </label>
            <input type='text' required name='cardNumber' />
          </form>
          <Link to={`/guest/cart/confirmation`}>
            <button onClick={handleGuestOrder} >Order</button>
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
    guestCheckoutState: state.guestCheckout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkoutDispatch: (userId, item) => dispatch(checkout(userId, item)),
    clearCart: () => dispatch(getCart({})),
    dispatchSubmit: (firstName, lastName, email) => dispatch(guestCheckout(firstName, lastName, email)),
    // clearGuestCart: () => dispatch(localStorage.clear())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
