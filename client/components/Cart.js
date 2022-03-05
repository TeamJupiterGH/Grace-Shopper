import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//-------
import { fetchCart, deleteItemInCart, updatedQuantity } from "../store/cart";
class Cart extends React.Component {
  //-------
  constructor() {
    super();
    //   this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    //need to check userId
    // const userId = this.props.user.id;
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
      console.log("this is props---->", this.props);
    }
  }

  // handleChange(event) {
  //   const userId = this.props.user.id;
  //   event.preventDefault();
  //   const updatedQuantity = event.target.value;
  //   console.log(updatedQuantity);
  //   this.props.updatedQuantity(userId, { quantity: updatedQuantity });
  // }
  render() {
    console.log("render?????");
    const userId = this.props.match.params.userId;
    const arr = JSON.parse(localStorage.getItem("tempCart")) || [];
    let subtotal = 0;
    if (
      this.props.itemsInCart.products &&
      this.props.itemsInCart.products.length > 0
    ) {
      return (
        <div>
          <div>
            {this.props.itemsInCart.products.map((item) => {
              subtotal += item.price * item.order_details.quantity;
              console.log("SUBTOTAL----------", subtotal);
              console.log("ITEM.PRICE-------", item);
              return (
                <div key={item.id}>
                  <h1>{item.name}</h1>
                  <img src={item.imageUrl} />
                  <form
                    onChange={(event) => {
                      event.preventDefault();
                      const updatedQuantity = event.target.value;
                      this.props.updatedQuantity(userId, {
                        productId: item.id,
                        quantity: parseInt(updatedQuantity),
                      });
                    }}
                  >
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" />
                  </form>
                  <div>${item.price / 100}/ea</div>
                  <button
                    type="submit"
                    onClick={() =>
                      this.props.deleteItemInCart(
                        this.props.match.params.userId,
                        item
                      )
                    }
                  >
                    Delete
                  </button>
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
          <div>
            {arr.map((item, idx) => {
              subtotal += item.price;
              return (
                <div key={idx}>
                  <h1>{item.name}</h1>
                  <img src={item.imageUrl} />
                  <div>${item.price / 100}</div>
                  {/* need to set up delete button to be functional */}
                  <button>Delete</button>
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
    updatedQuantity: (userId, item) => dispatch(updatedQuantity(userId, item)),
  };
};

//-------
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
//export default connect(mapStateToProps)(Cart);
