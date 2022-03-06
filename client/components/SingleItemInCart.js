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
    const { item } = this.props;
    console.log("EVER GET IN HERE?");
    console.log("PREVPROPS.ITEM.ID?", prevProps.item.id);
    console.log("THIS PROPS.ITEM.ID?", this.props.item.id);
    if (prevProps.item.id !== this.props.item.id) {
      console.log("HOW ABOUT HERE?", this.props.itemsInCart.product[item.id]);
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
    const { item, userId, match } = this.props;
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
          onClick={() => this.props.deleteItemInCart(match.params.userId, item)}
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
