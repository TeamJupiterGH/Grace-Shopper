import React, { Component } from "react";
import { editProduct } from "../store/singleProduct";
import { fetchSingleProduct } from "../store/singleProduct";
import { connect } from "react-redux";
import { setSingleProduct } from "../store/singleProduct";

export class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        description: this.props.product.description || "",
        price: this.props.product.price || 0,
        imageUrl:
          this.props.product.imageUrl || "https://i.imgur.com/YuvayvP.png?1",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.imageUrl === "") {
      await this.setState({ imageUrl: "https://i.imgur.com/YuvayvP.png?1" });
    }
    this.props.editProduct({ ...this.props.product, ...this.state });
  }

  render() {
    console.log("Edit Product props", this.props.history);

    console.log("HISTORY----", history);
    const { handleSubmit, handleChange } = this;
    const { name, description, price, imageUrl } = this.state;
    return (
      <div>
        <h2>Edit product here:</h2>
        <form id="edit-product-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input name="name" required onChange={handleChange} value={name} />
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            required
            onChange={handleChange}
            value={description}
          />
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            required
            type="number"
            onChange={handleChange}
            value={price}
          />
          <label htmlFor="imageUrl">Image:</label>
          <input name="imageUrl" onChange={handleChange} value={imageUrl} />
          &nbsp;&nbsp; <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editProduct: (product) => dispatch(editProduct(product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
