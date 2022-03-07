import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { addItemToGuestCart } from '../store/cartForGuest';
import { EditProduct } from './EditProduct';
import { editProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleClickForGuest = this.handleClickForGuest.bind(this);
  }
  handleClick() {
    //console.log("add to cart is clicked");
    this.props.addToCart(this.props.user.id, this.props.product);
  }

  handleClickForGuest() {
    this.props.addToGuestCart(this.props.product);
  }
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }

  render() {
    const product = this.props.product;
    const userId = this.props.user.id;
    //console.log('SingleProduct props', this.props, product)
    return (
      <div>
        <img src={product.imageUrl} className="single-product-image"></img>
        <h1>{product.name}</h1>
        <h2>{product.description}</h2>
        <h3>${product.price / 100}</h3>
        {userId ? (
          <Link to={`/users/${userId}/cart`}>
            <button onClick={this.handleClick}>Add to cart</button>
          </Link>
        ) : (
          <Link to={`/guest/cart`}>
            <button onClick={this.handleClickForGuest}>Add to cart</button>
          </Link>
        )}
        {this.props.isAdmin ? (
          <div>
            <EditProduct
              //history={this.props.history}
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
    user: state.auth,
    product: state.product,
    isAdmin: state.auth.isAdmin,
    itemsInCart: state.itemsInCart,
    itemsInCartForGuest: state.itemsInCartForGuest
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    editProduct: (product, id) => dispatch(editProduct(product, id)),
    addToCart: (userId, item) => dispatch(addToCart(userId, item)),
    addToGuestCart: (item) => dispatch(addItemToGuestCart(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
