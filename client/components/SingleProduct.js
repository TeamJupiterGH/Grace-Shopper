import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("add to cart is clicked");
    this.props.addToCart(this.props.user.id, this.props.product);
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }
  render() {
    const product = this.props.product;
    const userId = this.props.user.id;
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <div>
        <img src={product.imageUrl}></img>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>${product.price / 100}</h3>
        {isLoggedIn ? (
          <Link to={`/users/${userId}/cart`}>
            <button onClick={this.handleClick}>Add to cart</button>
          </Link>
        ) : (
          <Link to={`/guest/cart`}>
            <button
              onClick={() => {
                if (!localStorage.tempCart) {
                  localStorage.setItem("tempCart", JSON.stringify([product]));
                } else {
                  const arr = JSON.parse(localStorage.getItem("tempCart"));
                  arr.push(product);
                  localStorage.setItem("tempCart", JSON.stringify(arr));
                }
              }}
            >
              Add to cart
            </button>
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    user: state.auth,
    product: state.product,
    itemsInCart: state.itemsInCart,
    itemsInCartForGuest: state.itemsInCartForGuest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (userId, item) => dispatch(addToCart(userId, item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
