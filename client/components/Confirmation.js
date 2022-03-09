import React from 'react';
import { connect } from 'react-redux';

class Confirmation extends React.Component {
  componentDidMount(){
    console.log('in component did mount', this.props);
    // localStorage.clear();

  }

  render() {
    console.log('this is props in confirmation', this.props);
    console.log('ORDER STATUS', this.props.orderStatus);
    console.log('guest order', this.props.guestOrder);

    const { orderStatus, guestOrder } = this.props;
    const productArr = orderStatus.products || [];
    // const arr = guestOrder.products;
    const arr = JSON.parse(localStorage.getItem('tempCart')) || guestOrder.products;
    

    let subtotal = 0;
    
    
    if (this.props.orderStatus.id) {
      return (
        <div>
          <h2> THANK YOU FOR YOUR ORDER!</h2>
          <h2>Order confirmation REF#{orderStatus.id}</h2>
          <div>
            {productArr.map((product) => {
              subtotal += product.price * product.order_details.quantity;
              return (
                <div key={product.id}>
                  <br />
                  <img src={product.imageUrl} />
                  <div>Name: {product.name}</div>
                  <div>Quantity: {product.order_details.quantity}</div>
                  <br />
                  <hr />
                </div>
              );
            })}
            <h3>Subtotal: ${subtotal / 100}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2> THANK YOU FOR YOUR ORDER! </h2>
          <h2>Order confirmation REF#{guestOrder.id}</h2>
          <div>
            {arr.map((product) => {
              subtotal += product.price * product.quantity;
              return (
                <div key={product.id}>
                  <br />
                  <img src={product.imageUrl} />
                  <div>Name: {product.name}</div>
                  <div>Quantity: {product.quantity}</div>
                  <br />
                  <hr />
                </div>
              );
            })}
            {/* <h3>Subtotal: ${subtotal / 100}</h3> */}
            
          </div>
          {localStorage.clear()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orderStatus: state.checkout,
    guestOrder: state.guestCheckout
  };
};


export default connect(mapStateToProps)(Confirmation);
