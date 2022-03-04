import React, { useState } from "react";
import { connect } from "react-redux";

class CartForGuest extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("does it get to cart?????????", this.subTotal);
    if (this.props.itemInCart.length > 0) {
      return (
        <div>
          {this.props.itemInCart.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.imageUrl} />
              <div>{item.price / 100}</div>
            </div>
          ))}

          <div>Subtotal: $</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapState = (state) => {
  return {
    itemInCart: state.itemsInCartForGuest,
  };
};
export default connect(mapState)(CartForGuest);
