import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
import { addItemToGuestCart } from '../store/cartForGuest';
import { EditProduct } from './EditProduct';
import { editProduct } from '../store/products';

class SingleProduct extends React.Component {
  constructor() {
    super();
    console.log('constructor props', this.props)
    
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }

  render() {
    const product = this.props.product;
    console.log('SingleProduct props', this.props)
    return (
      <div>
        <img src={product.imageUrl}></img>
        <h1>Name: {product.name}</h1>
        <h2>Description: {product.description}</h2>
        <h3>Price: ${product.price / 100}</h3>
    
        {this.props.isAdmin ? (
          <div>
            <EditProduct
              history={this.props.history}
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
    product: state.product,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    editProduct: (product, id) => dispatch(editProduct(product, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
