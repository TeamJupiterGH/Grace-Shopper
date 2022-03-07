import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, _deleteProduct } from "../store/products";
import { fetchCart } from "../store/cart";

export class AllProducts extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts();

    console.log('this is props!!', this.props);
   
    if (this.props.isLoggedIn) {
      console.log('got to isLoggedIn!!');
      // this.props.fetchCart(1);
      this.props.fetchCart(this.props.user.id);
    }
  }

  render() {
    const { products } = this.props;

    console.log('this is props inside render', this.props);
    
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
            {this.props.isAdmin ? (

              <button
                onClick={() => {
                  this.props.deleteProduct(id);
                }}
              >
                Delete
              </button>
            ) : (
              <div></div>
            )}
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
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    deleteProduct: (id) => dispatch(_deleteProduct(id)),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
