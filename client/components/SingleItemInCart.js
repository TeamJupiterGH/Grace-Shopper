import React from "react";
import { connect } from "react-redux";
import { fetchCart, deleteItemInCart, updatedQuantity } from "../store/cart";

class SingleItemInCart extends React.Component {
  constructor() {
    super();
    this.state = { quantity: 1 };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    const item = this.props.item;
    console.log("PREV PROPS ITEMSINCART", prevProps.item.id);
    console.log("THIS PROPS ITEMSINCART", this.props.item.id);
    if (prevProps.item.id !== this.props.item.id) {
      console.log("EVER GET IN HERE? ");
      this.setState(
        {
          quantity:
            this.props.itemsInCart.products[item.id].order_details.quantity,
        } || 1
      );
    }
  }
  handleOnChange(event) {
    this.setState({ quantity: Number(event.target.value) });
  }
  render() {
    const { item, userId } = this.props;
    return (
      <div key={item.id}>
        <h1>{item.name}</h1>
        <img src={item.imageUrl} />
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
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleOnChange}
          />
        </form>
        <div>${item.price / 100}/ea</div>
        <button
          type="submit"
          onClick={() =>
            this.props.deleteItemInCart(this.props.match.params.userId, item)
          }
        >
          Delete
        </button>
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
