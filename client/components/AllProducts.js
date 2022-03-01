import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props;
    console.log('this is props!! ---->', this.props);
    console.log('this is products!! ---->', products);

    return (
      <div>
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div key={id}>
            <Link to={`/products/${id}`}>
            <h2>Name: {name}</h2>
            <h2>Price: ${price}</h2>
            <h2>Description: {description}</h2>
            <img src={imageUrl} />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
