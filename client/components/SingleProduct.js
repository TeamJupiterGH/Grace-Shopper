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
    return (
      <div>
        <img src={product.imageUrl}></img>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>${product.price / 100}</h3>
        <Link to={`/users/${userId}/cart`}>
          <button onClick={this.handleClick}>Add to cart</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    product: state.product,
    itemsInCart: state.itemsInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addToCart: (userId, item) => dispatch(addToCart(userId, item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
