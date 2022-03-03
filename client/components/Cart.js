import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//-------
import { fetchCart } from "../store/cart";
class Cart extends React.Component {
  //-------
  componentDidMount() {
    //need to check userId
    // const userId = this.props.user.id;
    const userId = this.props.match.params.userId;
    this.props.fetchCart(userId);
  }
  render() {
    if (
      this.props.itemsInCart.products &&
      this.props.itemsInCart.products.length > 0
    ) {
      return (
        <div>
          {this.props.itemsInCart.products.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <img src={item.imageUrl} />
              <div>${item.price / 100}</div>
            </div>
          ))}

          <h3>Subtotal: $TBD</h3>
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    itemsInCart: state.itemsInCart,
    user: state.auth,
  };
};
//-------
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

//-------
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
//export default connect(mapStateToProps)(Cart);