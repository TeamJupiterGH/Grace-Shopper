import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SingleItemInCart from "./SingleItemInCart";
//-------
import { fetchCart, deleteItemInCart, updatedQuantity } from "../store/cart";
class Cart extends React.Component {
  //-------
  constructor() {
    super();
  }
  handleDeleteClick(item) {
    let tempCart = JSON.parse(localStorage.getItem("tempCart"));
    let itemId = item.id;
    let updatedCart = tempCart.filter((product) => product.id !== itemId);
    localStorage.setItem("tempCart", JSON.stringify(updatedCart));
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }

  render() {
    const arr = JSON.parse(localStorage.getItem("tempCart")) || [];
    let subtotal = 0;
    if (this.props.isLoggedIn) {
      if (
        this.props.itemsInCart.products &&
        this.props.itemsInCart.products.length > 0
      ) {
        return (
          <div>
            <div>
              {this.props.itemsInCart.products.map((item) => {
                subtotal += item.price * item.order_details.quantity;

                return (
                  <div key={item.id}>
                    <SingleItemInCart item={item} match={this.props.match} />
                  </div>
                );
              })}

              <h3>Subtotal: ${subtotal / 100}</h3>
              <Link to={`/users/${this.props.user.id}/checkout`}>
                <button>Check Out</button>
              </Link>
            </div>
          </div>
        );
      } else {
        return null;
      }
    } else if (!this.props.isLoggedIn) {
      return (
        <div>
          <div>
            {arr.map((item, idx) => {
              subtotal += item.price;
              return (
                <div key={idx}>
                  <h1>{item.name}</h1>
                  <img src={item.imageUrl} />
                  <div>${item.price / 100}</div>
                  {/* need to set up delete button to be functional */}
                  <button onClick={() => this.handleDeleteClick(item)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          <br />
          <h3>Subtotal: ${subtotal / 100}</h3>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    itemsInCart: state.itemsInCart,
    user: state.auth,
  };
};
//-------
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
    deleteItemInCart: (userId, item) =>
      dispatch(deleteItemInCart(userId, item)),
  };
};

//-------
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
