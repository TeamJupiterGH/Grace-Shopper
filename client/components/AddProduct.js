import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../store/products";

export class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addProduct({ ...this.state });
    this.setState({ name: "", description: "", price: 0})
  }


  render() {
    const { handleSubmit, handleChange } = this;
    const { name, description, price, imageUrl } = this.state;
  
    return (
      <div>
      <div className="add-new-product"><label htmlFor="add-product-header">Add New Product</label>
        </div>

      <form id="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name*</label>
        <input name="name" onChange={handleChange} value={name} />

        <label htmlFor="description">Description*</label>
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="price">Price*</label>
        <input name="price" onChange={handleChange} value={price} />

        <label htmlFor='imageUrl'>Image*:</label>
          <input
          name='imageUrl'
          onChange={handleChange}
          value={imageUrl}
          />
        
        &nbsp;&nbsp; <button type="submit">Submit</button>
        {/* <Link to="/">Cancel</Link> */}
      </form>
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
      addProduct: (product) => dispatch(addProduct(product)),
    };
  };
  
  export default connect(mapState, mapDispatch)(AddProduct);
