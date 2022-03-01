import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id);
  }
  render() {
      const product = this.props.product
    return (
        <div>
            <img src={product.imageUrl}></img>
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h3>${product.price}</h3>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
