import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../store/products';
import { fetchCart } from '../store/cart';
import AddProduct from './AddProduct';

export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProducts();

    if (this.props.isLoggedIn) {
      console.log('got to isLoggedIn!!');

      if (this.props.isLoggedIn) {
        console.log('got to isLoggedIn!!');

        this.props.fetchCart(this.props.user.id);
      }
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div className='grid-container'>
        {products.map(({ id, name, price, description, imageUrl }) => (
          <div key={id} className='grid-item'>
            <Link to={`/products/${id}`}>
              <div className='link'>
                <img src={imageUrl} className='product-image' />
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price / 100}</p>
                {/* <h2>Description: {description}</h2> */}
              </div>
            </Link>
            {this.props.isAdmin ? (
              <button
                className='delete'
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
        {this.props.isAdmin ? (
          <div>
            <div className='grid-item-add-product'>
              <AddProduct />
            </div>
            <Link to='/users'>View All Users</Link>
          </div>
        ) : (
          <div></div>
        )}
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
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
