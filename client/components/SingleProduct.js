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
        <h2 className="single-product-name">{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price / 100}</p>
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
                product.quantity = 1;
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
                    product.quantity++;
                  }
                  localStorage.setItem("tempCart", JSON.stringify(arr));
                  console.log('this is this.state!!!!', this.state)
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
