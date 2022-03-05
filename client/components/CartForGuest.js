import React from 'react';
import { connect } from 'react-redux';
// import { Link } from "react-router-dom";
import { fetchProducts } from '../store/products';
import { fetchCart } from '../store/cart';

class CartForGuest extends React.Component {
  componentDidMount() {
    // this.props.getProducts();
  }

  render() {
    {
      // localStorage.clear();
      // console.log('local storage start', localStorage);
      // console.log('setting local storage')
      // localStorage.setItem('cart', 'start');
      // console.log('getting local storage', localStorage.getItem('product'));
      // console.log('this is props', this.props);

      console.log(localStorage);
    }
    //   console.log("does it get to cart?????????", this.subTotal);
    //   if (this.props.itemInCart.length > 0) {
    //     return (
    //       <div>
    //         {this.props.itemInCart.map((item) => (
    //           <div key={item.id}>
    //             <h1>{item.name}</h1>
    //             <img src={item.imageUrl} />
    //             <div>{item.price / 100}</div>
    //           </div>
    //         ))}

    //         <div>Subtotal: $</div>
    //       </div>
    //     );
    //   } else {
    //     return null;
    //   }
    return (
      <div>
        <p>{localStorage.getItem('1')}</p>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    itemInCart: state.itemsInCartForGuest,
  };
};
export default connect(mapState)(CartForGuest);
