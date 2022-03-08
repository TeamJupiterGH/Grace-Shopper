import React from 'react';
import { connect } from 'react-redux';

class Confirmation extends React.Component {
  render() {
    console.log('ORDER STATUS', this.props.orderStatus);
    const { orderStatus } = this.props;
    const productArr = orderStatus.products || [];
    const arr = JSON.parse(localStorage.getItem('tempCart')) || [];
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
          <h2>Guest</h2>
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
            <h3>Subtotal: ${subtotal / 100}</h3>
          </div>

//           {productArr.map((product) => {
//             subtotal += product.price * product.order_details.quantity;
//             return (
//               <div key={product.id}>
//                 <br />
//                 <img
//                   src={product.imageUrl}
//                   className="checkout-product-image"
//                 />
//                 <div>Name: {product.name}</div>
//                 <div>Quantity: {product.order_details.quantity}</div>
//                 <br />
//                 <hr />
//               </div>
//             );
//           })}
//           <h3>Subtotal: ${subtotal / 100}</h3>

        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    orderStatus: state.checkout,
  };
};

export default connect(mapStateToProps)(Confirmation);
