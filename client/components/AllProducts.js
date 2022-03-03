import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import { fetchCart } from "../store/cart";
export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
    if (this.props.isLoggedIn) {
      this.props.fetchCart(this.props.user.id);
    }
  }
  render() {
    const { products } = this.props;

    return (
      <div className="grid-container">
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div key={id} className="grid-item">
            <Link to={`/products/${id}`}>
              <div className="link">
                <h2>Name: {name}</h2>
                <h2>Price: ${price / 100}</h2>
                <h2>Description: {description}</h2>
                <img src={imageUrl} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.auth,
    isLoggedIn: !!state.auth.id,
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
