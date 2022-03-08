import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
//import { addItemToGuestCart } from "../store/cartForGuest";
import { EditProduct } from "./EditProduct";
import { editProduct } from "../store/singleProduct";
import { setSingleProduct } from "../store/singleProduct";
class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleClick() {
    //console.log("add to cart is clicked");

    //   console.log("add to cart is clicked");

    this.props.addToCart(this.props.user.id, this.props.product);
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.clearProduct();
  }

  render() {
    const product = this.props.product;
    const userId = this.props.user.id;
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <div id="main">
        <img src={product.imageUrl} className="single-product-image"></img>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>${product.price / 100}</h3>
        {isLoggedIn ? (
          <Link to={`/users/${userId}/cart`}>
            <button className="add" onClick={this.handleClick}>
              Add to cart
            </button>
          </Link>
        ) : (
          <Link to={`/guest/cart`}>
            <button
              className="add"
              onClick={() => {
                // *EB
                product.quantity = 1;
                //
                if (!localStorage.tempCart) {
                  localStorage.setItem("tempCart", JSON.stringify([product]));
                } else {
                  const arr = JSON.parse(localStorage.getItem("tempCart"));
                  const ids = arr.map((obj) => {
                    return obj.id;
                  });
                  if (ids.indexOf(product.id) === -1) {
                    arr.push(product);
                  } else {
                    console.log("got to else!");
                    product.quantity++;
                  }
                  localStorage.setItem("tempCart", JSON.stringify(arr));
                }
              }}
            >
              Add to cart
            </button>
          </Link>
        )}
        {this.props.isAdmin ? (
          <div>
            <EditProduct
              history={this.props.history}
              match={this.props.match}
              product={product}
              editProduct={this.props.editProduct}
            />
          </div>
        ) : (
          <div></div>
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
    isAdmin: state.auth.isAdmin,
    itemsInCart: state.itemsInCart,
    itemsInCartForGuest: state.itemsInCartForGuest,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    editProduct: (product, id) => dispatch(editProduct(product, id)),
    addToCart: (userId, item) => dispatch(addToCart(userId, item)),
    clearProduct: () => dispatch(setSingleProduct({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
