import React from "react";
import { connect } from "react-redux";

class Confirmation extends React.Component {
  render() {
    console.log("ORDER STATUS", this.props.orderStatus);
    const { orderStatus } = this.props;
    const productArr = orderStatus.products || [];
    let subtotal = 0;
    return (
      <div>
        <h2> THANK YOU FOR YOUR ORDER!</h2>
        <h2>Order confirmation REF#{orderStatus.id}</h2>
        <div>
          {productArr.map((product) => {
            subtotal += product.price * product.order_details.quantity;
            return (
              <div key={product.id}>
                <img src={product.imageUrl} />
                <div>Name: {product.name}</div>
                <div>Quantity: {product.order_details.quantity}</div>
                <br />
              </div>
            );
          })}
          <h3>Subtotal: ${subtotal / 100}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderStatus: state.checkout,
  };
};

export default connect(mapStateToProps)(Confirmation);
