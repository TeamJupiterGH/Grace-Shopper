import React from "react";
import { connect } from "react-redux";
import { fetchCart, deleteItemInCart, updatedQuantity } from "../store/cart";

class SingleItemInCart extends React.Component {
  constructor() {
    super();
    this.state = { quantity: 10 };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentDidMount() {
    console.log("single cart item");
    this.setState({ quantity: this.props.item.order_details.quantity });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const item = this.props.item;
  //   console.log("EVER GET IN HERE?");
  //   // console.log('this is props-->>>', this.props);
  //   // console.log('this is item', item);
  //   // console.log("PREVPROPS.ITEM.ID?", prevProps.item.id);
  //   // console.log("THIS PROPS.ITEM.ID?", this.props.item.id);

  //   if (prevProps.item.id !== item.id) {
  //     console.log("EVER HERE?");
  //     this.setState({ quantity: item.order_details.quantity || [] });
  //   }
  // }
  handleOnChange(event) {
    this.setState({ quantity: Number(event.target.value) });
  }
  render() {
    const { item, userId, match } = this.props;
    return (
      <div key={item.id}>
        <h1 className="single-item-name">{item.name}</h1>
        <img src={item.imageUrl} className="checkout-product-image" />
        <form
          onChange={(event) => {
            event.preventDefault();
            const updatedQuantity = event.target.value;
            this.props.updatedQuantity(userId, {
              productId: item.id,
              quantity: parseInt(updatedQuantity),
            });
          }}
        >
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            min={0}
            step={1}
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleOnChange}
          />
        </form>
        <div>${item.price / 100}/ea</div>
        <button
          className="delete"
          type="submit"
          onClick={() => this.props.deleteItemInCart(match.params.userId, item)}
        >
          Remove
        </button>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItemInCart: (userId, item) =>
    dispatch(deleteItemInCart(userId, item)),
    updatedQuantity: (userId, item) => dispatch(updatedQuantity(userId, item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleItemInCart);
