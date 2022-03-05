import React, { useState } from "react";
import { connect } from "react-redux";

class CartForGuest extends React.Component {
  render() {
    const arr = JSON.parse(localStorage.getItem("tempCart")) || [];

    return (
      <div>
        <div>
          {arr.map((item, idx) => (
            <div key={idx}>
              <h1>{item.name}</h1>
              <img src={item.imageUrl} />
              <div>${item.price / 100}</div>
            </div>
          ))}
        </div>

        <div>Subtotal: $</div>
      </div>
    );
  }
}

export default CartForGuest;
