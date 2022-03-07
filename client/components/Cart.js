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
    this.state = {
      quantity: 1,
      cart: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  // handleDeleteClick(item) {
  //   let tempCart = JSON.parse(localStorage.getItem("tempCart"));
  //   let itemId = item.id;
  //   let updatedCart = tempCart.filter((product) => product.id !== itemId);
  //   localStorage.setItem("tempCart", JSON.stringify(updatedCart));
  // }
  handleDeleteClick(item) {
    let tempCart = JSON.parse(localStorage.getItem("tempCart"));
    let itemId = item.id;
    let updatedCart = tempCart.filter((product) => product.id !== itemId);
    localStorage.setItem("tempCart", JSON.stringify(updatedCart));
    this.setState({ cart: updatedCart });
  }
  handleOnChange(event) {
    event.preventDefault();
    this.setState({ quantity: Number(event.target.value) });
  }
  componentDidMount() {
    console.log(
      "ITEMS IN CART IN CART.JS DIDMOUNT",
      this.props.itemsInCart.products
    );
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }

  render() {
    console.log(
      "ITEMS IN CART IN CART.JS RENDER",
      this.props.itemsInCart.products
    );
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
      //  } else if (!this.props.isLoggedIn) {
      // return (
      //   <div>
      //     <div>
      //       {arr.map((item, idx) => {
      //         subtotal += item.price;
      //         return (
      //           <div key={idx}>
      //             <h1>{item.name}</h1>
      //             <img src={item.imageUrl} />
      //             <div>${item.price / 100}</div>
      //             {/* need to set up delete button to be functional */}
      //             <button onClick={() => this.handleDeleteClick(item)}>
      //               Delete
      //             </button>
      //           </div>
      //         );
      //       })}
      //     </div>
      //     <br />
      //     <h3>Subtotal: ${subtotal / 100}</h3>
      //   </div>
      // );
    } else if (!this.props.isLoggedIn) {
      return (
        <div>
          <div>
            {arr.map((item, idx) => {
              subtotal += item.price * item.quantity;
              return (
                <div key={idx}>
                  <h1>{item.name}</h1>
                  <img src={item.imageUrl} />
                  <form
                    onChange={(event) => {
                      event.preventDefault();
                      let updatedQTY = event.target.value;
                      let itemId = item.id;
                      let existingCart = JSON.parse(
                        localStorage.getItem("tempCart")
                      );
                      let updatedCart = existingCart.map((product) => {
                        if (product.id === itemId) {
                          return { ...product, quantity: updatedQTY };
                        } else {
                          return product;
                        }
                      });
                      localStorage.setItem(
                        "tempCart",
                        JSON.stringify(updatedCart)
                      );
                      this.handleOnChange(event);
                    }}
                  >
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      min={0}
                      step={1}
                      name="quantity"
                      value={item.quantity}
                      onChange={this.handleOnChange}
                    />
                  </form>
                  <div>${item.price / 100}/ea</div>
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
